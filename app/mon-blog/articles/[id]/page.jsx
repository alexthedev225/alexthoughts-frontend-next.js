import ArticleDetails from '../../../components/ArticleDetails';
import React from 'react';

const Page = ({params}) => {
    const id = params.id
    return (
       <ArticleDetails id={id}/>
    );
}

export default Page;
