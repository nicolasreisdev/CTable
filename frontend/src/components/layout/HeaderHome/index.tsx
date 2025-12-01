import * as S from './styles';

export default function HeaderHome() {
    return (
        <S.HeaderContainer>

            <S.ActionsContainer>
                <S.Button to="/login"> 
                    Login
                </S.Button>

                <S.Button to="/register"> 
                    Register
                </S.Button>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}