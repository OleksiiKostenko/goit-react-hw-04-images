import React, { createContext, useContext, useState } from 'react';

export const ContextValue = createContext();

export const useInputContex = () => {
  return useContext(ContextValue);
};

export const Context = ({ children }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadBtn, setIsLoadBtn] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');

  return (
    <ContextValue.Provider
      value={{
        query: query,
        setQuery: setQuery,
        page: page,
        setPage: setPage,
        images: images,
        setImages: setImages,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        isLoadBtn: isLoadBtn,
        setIsLoadBtn: setIsLoadBtn,
        isShowModal: isShowModal,
        setIsShowModal: setIsShowModal,
        largeImage: largeImage,
        setLargeImage: setLargeImage,
        tags: tags,
        setTags: setTags,
      }}
    >
      {children}
    </ContextValue.Provider>
  );
};
