import styled from "styled-components";
import { darken, lighten, transparentize } from "polished";

export const Container = styled.aside`
  background: ${darken(0.02, "#282a36")};
  min-width: 280px;
  height: 100%;
  border-right: 1px solid ${lighten(0.05, "#282a36")};
`;

export const Header = styled.form`
  display: flex;
  align-items: center;
  background: #7159c1;

  border-bottom: 1px solid ${lighten(0.05, "#282a36")};
  padding: 15px;

  input {
    flex: 1;
    height: 32px;
    border-radius: 4px;
    border: 0;
    background: #fff;
    padding: 0 10px;
    font-size: 14px;
    color: #333;
  }

  button {
    border: 0;
    background: transparent;
    padding-left: 15px;
  }
`;

export const DatabaseList = styled.ul`
  margin-top: 10px;

  li {
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #727985;
    font-size: 14px;
    border-bottom: 1px solid ${transparentize(0.95, "#fff")};

    span {
      font-size: 12px;
      font-weight: 600;
    }
  }
`;
