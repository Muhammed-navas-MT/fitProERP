import { CreateConversationUseCase } from "../../../application/useCases/shared/chatManagement/createConversationUseCase";
import { ListConversationsUseCase } from "../../../application/useCases/shared/chatManagement/listConversationsUseCase";
import { ListMessagesUseCase } from "../../../application/useCases/shared/chatManagement/listMessagesUseCase";
import { MarkConversationSeenUseCase } from "../../../application/useCases/shared/chatManagement/markConversationSeenUseCase";
// import { MarkMessageSeenUseCase } from "../../../application/useCases/shared/chatManagement/markMessageSeenUseCase";
import { SendMessageUseCase } from "../../../application/useCases/shared/chatManagement/sendMessageUseCase";
import { MessageController } from "../../../presentation/controller/shared/chatController";
import { conversationModel } from "../../repository/databaseConfigs/models/conversationModel";
import { messageModel } from "../../repository/databaseConfigs/models/messageModel";
import { ConversationRepository } from "../../repository/shared/conversationRepo";
import { MessageRepository } from "../../repository/shared/messageRepo";
import { SocketService } from "../../services/socketService";

const conversationRepository = new ConversationRepository(conversationModel);
const messageRepository = new MessageRepository(messageModel);
const socketService = new SocketService();

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

export const injectedChatController = new MessageController(
  sendMessageUseCase,
  listMessageuseCase,
  markConversationMessagesSeenUseCase,
  createConversationUseCase,
  listConverSationUseCase,
);
