import React, { useEffect, useRef } from 'react';
import type { CardProps } from '../Card/Card';
import type { Dispatch, SetStateAction } from 'react';
import type { getUseCaseProps } from './GridCards';

export interface ScrollingPaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentTotalPages: number;
  setCurrentItems: Dispatch<SetStateAction<CardProps[]>>;
  getUseCases: getUseCaseProps | undefined;
  currentSearch: string | undefined;
  currentFilter: { [key: string]: string | undefined } | undefined;
  setTotalPages: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ScrollingPagination = ({
  currentPage,
  setCurrentPage,
  currentTotalPages,
  setCurrentItems,
  getUseCases,
  currentSearch,
  currentFilter,
  setTotalPages,
  loading,
  setLoading,
}: ScrollingPaginationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentPage > 1) {
      const fetchItems = async () => {
        try {
          setLoading(true); // Set loading at start of async operation

          if (getUseCases && currentPage <= currentTotalPages) {
            const response = await getUseCases({
              ...(currentPage && { page: currentPage.toString() }),
              ...(currentSearch && { search: currentSearch }),
              ...(currentFilter && { filterQuery: currentFilter }),
            });
            setCurrentItems((prevItems) => [...prevItems, ...response.items]);
            setTotalPages(Number(response.pagination.totalPages));
            setCurrentPage(Number(response.pagination.currentPage));
          }
        } catch (error) {
          console.error('Error fetching items:', error);
        } finally {
          setLoading(false); // Set loading false after operation completes
        }
      };

      fetchItems();
    }
  }, [currentPage, getUseCases, currentTotalPages]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log('loading more articles...');
        setCurrentPage((prevPage) => {
          return prevPage < currentTotalPages ? prevPage + 1 : prevPage;
        });
      }
    };

    // Only setup observer if not loading and more pages exist
    if (!loading && currentPage < currentTotalPages) {
      observerRef.current = new IntersectionObserver(observerCallback, {
        root: null, // Observes in the viewport
        rootMargin: '0px',
        threshold: 1.0, // Fully visible
      });

      if (sentinelRef.current) {
        observerRef.current.observe(sentinelRef.current);
      }
    }

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  // Don't render sentinel if loading or no more pages
  if (loading || currentPage >= currentTotalPages) {
    return null;
  }

  return (
    <div
      ref={sentinelRef}
      style={{
        height: '1px',
        marginBottom: '10px',
      }}
    ></div>
  );
};

export default ScrollingPagination;
