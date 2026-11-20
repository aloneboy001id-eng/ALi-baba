import "server-only";

export type OrderNotification = {
  orderId: string;
  customerPhone: string;
  message: string;
};

export interface NotificationService {
  sendOrderReceived(notification: OrderNotification): Promise<void>;
}

export function createNotificationService(): NotificationService {
  throw new Error("Notification provider is not configured yet.");
}
