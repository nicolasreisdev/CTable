import * as S from './styles';

export default function HeaderHome() {
    return (
        <S.HeaderContainer>

            {/* 2. Ações do Usuário */}
            <S.ActionsContainer>
                {/* Botão "Create" */}
                <S.Button to="/login"> {/* Redireciona para tela de criação */}
                    Login
                </S.Button>

                <S.Button to="/register"> {/* Redireciona para tela de criação */}
                    Register
                </S.Button>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}