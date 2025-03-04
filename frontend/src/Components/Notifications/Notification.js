import React from 'react';
import styled from 'styled-components';
import {
  money,
  trash,
  circle,
  piggy,
  freelance,
  comment,
  calender,
  card,
  // ...any other icons you need
} from '../../utils/Icons';
import { dateFormat } from '../../utils/dateFormat';

function Notification({ notifications = [], onClearNotification }) {
  /**
   * This component receives an array of notifications.
   * Each notification might look like:
   * {
   *   id: 'abc123',
   *   type: 'pending-bill' | 'payment' | 'goal-progress',
   *   title: 'Pending Electricity Bill',
   *   message: 'Your electricity bill of $50 is due tomorrow',
   *   date: '2023-01-25',
   *   amount: 50,
   * }
   *
   * `onClearNotification` is an optional callback to remove a notification,
   * or you can omit it if you don’t need to clear notifications.
   */

  // Helper to return the right icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'pending-bill':
        return trash; // or some "exclamation" icon
      case 'payment':
        return card;  // or money, etc.
      case 'goal-progress':
        return piggy; // or circle, etc.
      default:
        return circle;
    }
  };

  return (
    <NotificationStyled>
      <h2 className="notif-title">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-notifs">No new notifications</p>
      ) : (
        notifications.map((notif) => (
          <div className="notification-item" key={notif.id}>
            <div className="icon">{getNotificationIcon(notif.type)}</div>

            <div className="content">
              <h5>{notif.title}</h5>
              <p className="message">{notif.message}</p>

              {/* Example usage of date/amount if you have them */}
              <div className="details">
                {notif.date && (
                  <span>
                    {calender} {dateFormat(notif.date)}
                  </span>
                )}
                {notif.amount && (
                  <span>
                    {money} ${notif.amount}
                  </span>
                )}
              </div>
            </div>

            {/* Optional clear/remove button or icon */}
            {onClearNotification && (
              <div
                className="clear-btn"
                onClick={() => onClearNotification(notif.id)}
              >
                {comment} Clear
              </div>
            )}
          </div>
        ))
      )}
    </NotificationStyled>
  );
}

const NotificationStyled = styled.div`
  /* A card-like container for all notifications */
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #222260;

  .notif-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .no-notifs {
    font-size: 1rem;
    color: rgba(34, 34, 96, 0.6);
    text-align: center;
    margin: 1rem 0;
  }

  .notification-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: #fff;
    border-radius: 10px;
    margin: 0.6rem 0;
    padding: 0.8rem;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);

    .icon {
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border: 2px solid #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 1.6rem;
      }
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      h5 {
        font-size: 1.1rem;
        color: #222260;
      }

      .message {
        font-size: 0.95rem;
        color: var(--primary-color);
        opacity: 0.8;
      }

      .details {
        margin-top: 0.3rem;
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: rgba(34, 34, 96, 0.6);
        align-items: center;
        span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
      }
    }

    .clear-btn {
      font-size: 0.85rem;
      color: #fff;
      background: var(--color-green);
      border-radius: 20px;
      padding: 0.3rem 0.6rem;
      cursor: pointer;
      align-self: center;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: #2ecc71; /* Slightly lighter or darker green */
      }
    }
  }
`;

export default Notification;
