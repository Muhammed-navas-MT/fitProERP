import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "../../presentation/middlewares/socketAuthMiddleware";
import { SocketRooms } from "./socketRoom";

let io: Server;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;

    socket.join(SocketRooms.user(userId));

    console.log("Socket connected:", {
      socketId: socket.id,
      userId,
    });

    socket.on("conversation:join", (conversationId: string) => {
      socket.join(SocketRooms.conversation(conversationId));
      console.log(`Joined conversation room: ${conversationId}`);
    });

    socket.on("conversation:leave", (conversationId: string) => {
      socket.leave(SocketRooms.conversation(conversationId));
      console.log(`Left conversation room: ${conversationId}`);
    });

    socket.on("chat:typing", ({ conversationId }) => {
      socket
        .to(SocketRooms.conversation(conversationId))
        .emit("chat:user-typing", {
          conversationId,
          userId,
        });
    });

    socket.on("chat:stop-typing", ({ conversationId }) => {
      socket
        .to(SocketRooms.conversation(conversationId))
        .emit("chat:user-stop-typing", {
          conversationId,
          userId,
        });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }
  return io;
};
