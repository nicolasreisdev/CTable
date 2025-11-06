import React from 'react';
import HeaderHome from '../../components/layout/HeaderHome';
import * as S from './styles';

export default function Home() {
    return (
        <S.HomePageContainer>
            <HeaderHome />
            <S.ContentWrapper>
                <S.SiteTitle>CTable</S.SiteTitle>
                <S.Tagline>Descubra, compartilhe, aprenda, converse: um novo mundo se abre para os amantes de computação.</S.Tagline>
            </S.ContentWrapper>
    </S.HomePageContainer>
    );
}