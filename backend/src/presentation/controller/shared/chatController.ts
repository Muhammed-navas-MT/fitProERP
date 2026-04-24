import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { IListMessagesUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/listMessagesUseCaseInterface";
import { ISendMessageUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/sendMessageUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { Roles } from "../../../domain/enums/roles";
import { ChatUserModel } from "../../../domain/enums/chatUserModel";
import { ICreateConversationUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/createConversationUseCaseInterface";
import { IListConversationsUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/listConversationsUseCaseInterface";
import { IMarkConversationSeenUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/markConversationSeenUseCase";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IUploadMessageImageUseCase } from "../../../application/interfaces/useCase/shared/chatManagement/uploadMessageImageUseCaseInterface"; // CHANGED

export class MessageController {
  constructor(
    private _sendMessageUseCase: ISendMessageUseCase,
    private _listMessagesUseCase: IListMessagesUseCase,
    private _markConversationSeenUseCase: IMarkConversationSeenUseCase,
    private _createConversationUseCase: ICreateConversationUseCase,
    private _listConversationsUseCase: IListConversationsUseCase,
    private _uploadMessageImageUseCase: IUploadMessageImageUseCase,
  ) {}

  private getChatUserModel(role: Roles): ChatUserModel {
    return role === Roles.TRAINER
      ? ChatUserModel.TRAINER
      : ChatUserModel.MEMBER;
  }

  sendMessage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { conversationId, receiverId, text, imageUrl, type } = req.body;
      console.log(req.body);

      const senderId = res.locals.data.id;
      const senderRole = res.locals.data.role;

      const senderModel =
        senderRole === Roles.TRAINER
          ? ChatUserModel.TRAINER
          : ChatUserModel.MEMBER;

      const receiverModel =
        senderModel === ChatUserModel.MEMBER
          ? ChatUserModel.TRAINER
          : ChatUserModel.MEMBER;

      const response = await this._sendMessageUseCase.execute({
        conversationId,
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        text,
        imageUrl,
        type,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Message sent successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  listMessages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { conversationId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const response = await this._listMessagesUseCase.execute({
        conversationId,
        page: Number(page),
        limit: Number(limit),
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Messages fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  markMessageSeen = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { conversationId } = req.params;
      const viewerId = res.locals.data.id;
      const response = await this._markConversationSeenUseCase.execute({
        conversationId,
        viewerId,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Message marked as seen",
        response,
      );
    } catch (error) {
      next(error);
    }
  };
  createConversation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { secondUserId, secondUserModel } = req.body;

      const firstUserId = res.locals.data.id;

      const firstUserModel =
        res.locals.data.role === Roles.TRAINER
          ? ChatUserModel.TRAINER
          : ChatUserModel.MEMBER;

      const response = await this._createConversationUseCase.execute({
        firstUserId,
        firstUserModel,
        secondUserId,
        secondUserModel,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Conversation created successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  };
  listConversations = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { page = 1, limit = 20 } = req.query;

      const userId = res.locals.data.id;
      const role = res.locals.data.role;

      const response = await this._listConversationsUseCase.execute({
        userId,
        userModel: this.getChatUserModel(role),
        page: Number(page),
        limit: Number(limit),
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Conversations fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const file = req.file;
      const { conversationId, receiverId, text } = req.body;

      if (!file) {
        throw new BadRequestException("Message image is required");
      }

      if (!conversationId?.trim()) {
        throw new BadRequestException("Conversation id is required");
      }

      if (!receiverId?.trim()) {
        throw new BadRequestException("Receiver id is required");
      }

      const senderId = res.locals.data.id;
      const senderRole = res.locals.data.role;

      const senderModel =
        senderRole === Roles.TRAINER
          ? ChatUserModel.TRAINER
          : ChatUserModel.MEMBER;

      const receiverModel =
        senderModel === ChatUserModel.MEMBER
          ? ChatUserModel.TRAINER
          : ChatUserModel.MEMBER;

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "chat-images",
        resource_type: "image",
        transformation: [
          {
            width: 1200,
            height: 1200,
            crop: "limit",
          },
          {
            quality: "auto",
          },
        ],
      });

      const response = await this._uploadMessageImageUseCase.execute({
        conversationId,
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        text,
        imageUrl: uploadResult.secure_url,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Image message sent successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  };
}
