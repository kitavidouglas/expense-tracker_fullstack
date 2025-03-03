import React from 'react';
import styled from 'styled-components';
import img from '../../img/img1.jpeg';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
  return (
    <NavStyled>
      <div className="user-con">
        <img src={img} alt="" />
        <div className="text">
          <h2>Miky Haller</h2>
          <p>Your Money</p>
        </div>
      </div>

      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      <div className="bottom-nav">
        <li>
          {signout} Sign Out
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  background: #fff;
  border-right: 1px solid #e5e5e5;
  width: 250px;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    .text {
      h2 {
        font-size: 1.2rem;
        color: #222260;
        margin-bottom: 0.2rem;
      }
      p {
        color: rgba(34, 34, 96, 0.6);
        font-size: 0.9rem;
      }
    }
  }

  .menu-items {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1rem;
      margin: 0.3rem 0;
      font-weight: 500;
      cursor: pointer;
      color: rgba(34, 34, 96, 0.6);
      border-radius: 4px;
      transition: background-color 0.3s ease;

      i {
        font-size: 1.2rem;
      }

      &:hover {
        background-color: #f1f1f1;
      }
    }

    .active {
      background-color: #dce6f5;
      color: rgba(34, 34, 96, 1);

      i {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .bottom-nav {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1rem;
      font-weight: 500;
      cursor: pointer;
      color: rgba(34, 34, 96, 0.6);
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
`;

export default Navigation;
