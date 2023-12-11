import Styles from '../styles/search.module.scss';
import { useState, type SyntheticEvent, useEffect } from 'react';
import { getCollection } from 'astro:content';
import { createPortal } from 'react-dom';
import { formatUrl } from '../utils/common';

const allBlogPosts = await getCollection('blog');

export function Search() {
  const [visible, setVisible] = useState(false);
  const [filterPost, setfilterPost] =
    useState<{ url: string; title: string; id: string }[]>();
  const [popupContainer, setPopupContainer] = useState<HTMLElement>();

  useEffect(() => {
    setPopupContainer(window.document.body);
  }, []);
  const changeInput = (ele: SyntheticEvent) => {
    const value = (ele.currentTarget as HTMLInputElement).value;
    if (!value) {
      setfilterPost([]);
      return;
    }
    const findPost = allBlogPosts
      ?.filter?.(item => item.body.includes(value))
      .map(item => ({
        url: formatUrl(item),
        title: item.data.title,
        id: item.id,
      }));
    setfilterPost(findPost);
  };
  const clickSearch = () => {
    popupContainer?.classList?.add('search-active');
    setVisible(!visible);
  };
  const closeSearch = () => {
    popupContainer?.classList?.remove('search-active');
    setVisible(false);
    setfilterPost([]);
  };

  return (
    <>
      <span
        onClick={clickSearch}
        style={{ padding: '20px 10px', cursor: 'pointer' }}
      >
        Search
      </span>
      {popupContainer &&
        createPortal(
          visible && (
            <div className={Styles['search-wrapper']} onClick={closeSearch}>
              <div
                className={Styles['search-modal']}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <header className={Styles['search-searchBar']}>
                  <form className={Styles['search-form']}>
                    <input
                      className={Styles['search-input']}
                      placeholder='search'
                      onChange={changeInput}
                      autoFocus
                    />
                  </form>
                </header>
                <ul className={Styles['search-dropdown']}>
                  {filterPost?.map?.(item => (
                    <li key={item.id}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ),
          popupContainer
        )}
    </>
  );
}
