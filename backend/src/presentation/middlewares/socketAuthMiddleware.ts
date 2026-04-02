import { Socket } from "socket.io";
import * as cookie from "cookie";
import { JwtService } from "../../infrastructure/services/jwtService";

const jwtService = new JwtService();

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => {
  try {
    let token: string | undefined;

    token = socket.handshake.auth?.token;

    if (!token && socket.request.headers.cookie) {
      const cookies = cookie.parse(socket.request.headers.cookie);
      token = cookies.access_token;
    }

    if (!token) {
      console.error(" Socket auth failed: No token");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwtService.verifyAccessToken(token);

    if (!decoded) {
      console.error(" Socket auth failed: Invalid token");
      return next(new Error("Unauthorized"));
    }

    socket.data.user = {
      role: decoded?.role,
      id: decoded?.id,
      subdomain: decoded?.subdomain,
    };

    console.log(" Socket auth success:", decoded.id);
    next();
  } catch (err) {
    console.error(" Socket auth exception:", err);
    next(new Error("Unauthorized"));
  }
};
