import { CreateConversationUseCase } from "../../../application/useCases/shared/chatManagement/createConversationUseCase";
import { ListConversationsUseCase } from "../../../application/useCases/shared/chatManagement/listConversationsUseCase";
import { ListMessagesUseCase } from "../../../application/useCases/shared/chatManagement/listMessagesUseCase";
import { MarkConversationSeenUseCase } from "../../../application/useCases/shared/chatManagement/markConversationSeenUseCase";
// import { MarkMessageSeenUseCase } from "../../../application/useCases/shared/chatManagement/markMessageSeenUseCase";
import { SendMessageUseCase } from "../../../application/useCases/shared/chatManagement/sendMessageUseCase";
import { UploadMessageImageUseCase } from "../../../application/useCases/shared/chatManagement/uploadMessageImageUseCase";
import { CreateNotificationUseCase } from "../../../application/useCases/shared/notificationManagement/createNotificationUseCase";
import { MessageController } from "../../../presentation/controller/shared/chatController";
import { conversationModel } from "../../repository/databaseConfigs/models/conversationModel";
import { messageModel } from "../../repository/databaseConfigs/models/messageModel";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { ConversationRepository } from "../../repository/shared/conversationRepo";
import { MessageRepository } from "../../repository/shared/messageRepo";
import { NotificationRepository } from "../../repository/shared/notificationRepo";
import { NotificationService } from "../../services/notificationService";
import { SocketService } from "../../services/socketService";

const conversationRepository = new ConversationRepository(conversationModel);
const messageRepository = new MessageRepository(messageModel);
const socketService = new SocketService();
const notificatinRepository = new NotificationRepository(notificationModel);
const createNotificationUseCase = new CreateNotificationUseCase(
  notificatinRepository,
  socketService,
);
const notificationService = new NotificationService(createNotificationUseCase);

const sendMessageUseCase = new SendMessageUseCase(
  messageRepository,
  conversationRepository,
  socketService,
);
const listMessageuseCase = new ListMessagesUseCase(
  messageRepository,
  conversationRepository,
);
// const markMessageSeenUseCase = new MarkMessageSeenUseCase(
//   messageRepository,
//   socketService,
// );
const createConversationUseCase = new CreateConversationUseCase(
  conversationRepository,
  notificationService,
);
const listConverSationUseCase = new ListConversationsUseCase(
  conversationRepository,
  messageRepository,
);

const markConversationMessagesSeenUseCase = new MarkConversationSeenUseCase(
  messageRepository,
  conversationRepository,
  socketService,
);

const uploadImageUseCase = new UploadMessageImageUseCase(
  messageRepository,
  conversationRepository,
  socketService,
);

export const injectedChatController = new MessageController(
  sendMessageUseCase,
  listMessageuseCase,
  markConversationMessagesSeenUseCase,
  createConversationUseCase,
  listConverSationUseCase,
  uploadImageUseCase,
);
