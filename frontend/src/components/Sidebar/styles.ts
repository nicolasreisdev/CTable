import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
`;

export const SidebarTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const SidebarItem = styled.div`
    margin: 10px 0;     
    font-size: 1.2em;
    cursor: pointer;
    
    &:hover {
        color: #007BFF; 
    }
`;

export default SidebarContainer;