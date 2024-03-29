import Styles from '../styles/search.module.scss';
import { useState, type SyntheticEvent, useEffect } from 'react';
import { getCollection } from 'astro:content';
import { createPortal } from 'react-dom';
import { formatUrl, baseUrl } from '../utils/common';

const allBlogPosts = await getCollection('blog');

export function Search() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterPost, setfilterPost] =
    useState<{ url: string; title: string; id: string }[]>();
  const [popupContainer, setPopupContainer] = useState<HTMLElement>();

  useEffect(() => {
    setPopupContainer(window.document.body);
  }, []);
  const changeInput = (ele: SyntheticEvent) => {
    const value = (ele.currentTarget as HTMLInputElement).value;
    setSearchValue(value);
    if (!value) {
      setfilterPost([]);
      return;
    }
    const findPost = allBlogPosts
      ?.filter?.(
        item => item.body.includes(value) || item.data.title.includes(value)
      )
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
      <span onClick={clickSearch} className={Styles['search-title']}>
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
                  {filterPost?.map?.(item => {
                    const index = item.title.indexOf(searchValue);
                    const title =
                      index >= 0 ? (
                        <span>
                          {item.title.substring(0, index)}
                          {searchValue && <mark>{searchValue}</mark>}
                          {item.title.substring(index + searchValue.length)}
                        </span>
                      ) : (
                        item.title
                      );
                    return (
                      <li key={item.id}>
                        <a href={`${baseUrl}${item.url}`}>{title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ),
          popupContainer
        )}
    </>
  );
}
