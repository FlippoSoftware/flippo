import type { IIconProps } from './types/IIconProps';

type MoreIconProps = {
  type?: 'horizontal' | 'vertical';
} & IIconProps;

const MoreTypes = {
  horizontal:
    'M12 20C11.45 20 10.9793 19.8043 10.588 19.413C10.1967 19.0217 10.0007 18.5507 10 18C9.99934 17.4493 10.1953 16.9787 10.588 16.588C10.9807 16.1973 11.4513 16.0013 12 16C12.5487 15.9987 13.0197 16.1947 13.413 16.588C13.8063 16.9813 14.002 17.452 14 18C13.998 18.548 13.8023 19.019 13.413 19.413C13.0237 19.807 12.5527 20.0027 12 20ZM12 14C11.45 14 10.9793 13.8043 10.588 13.413C10.1967 13.0217 10.0007 12.5507 10 12C9.99934 11.4493 10.1953 10.9787 10.588 10.588C10.9807 10.1973 11.4513 10.0013 12 10C12.5487 9.99867 13.0197 10.1947 13.413 10.588C13.8063 10.9813 14.002 11.452 14 12C13.998 12.548 13.8023 13.019 13.413 13.413C13.0237 13.807 12.5527 14.0027 12 14ZM12 8.00001C11.45 8.00001 10.9793 7.80434 10.588 7.41301C10.1967 7.02167 10.0007 6.55067 10 6.00001C9.99934 5.44934 10.1953 4.97867 10.588 4.58801C10.9807 4.19734 11.4513 4.00134 12 4.00001C12.5487 3.99867 13.0197 4.19467 13.413 4.58801C13.8063 4.98134 14.002 5.45201 14 6.00001C13.998 6.54801 13.8023 7.01901 13.413 7.41301C13.0237 7.80701 12.5527 8.00267 12 8.00001Z',
  vertical:
    'M6 14C5.45 14 4.97933 13.8043 4.588 13.413C4.19667 13.0217 4.00067 12.5507 4 12C3.99934 11.4493 4.19533 10.9787 4.588 10.588C4.98067 10.1973 5.45133 10.0013 6 10C6.54867 9.99867 7.01967 10.1947 7.413 10.588C7.80634 10.9813 8.002 11.452 8 12C7.998 12.548 7.80234 13.019 7.413 13.413C7.02367 13.807 6.55267 14.0027 6 14ZM12 14C11.45 14 10.9793 13.8043 10.588 13.413C10.1967 13.0217 10.0007 12.5507 10 12C9.99934 11.4493 10.1953 10.9787 10.588 10.588C10.9807 10.1973 11.4513 10.0013 12 10C12.5487 9.99867 13.0197 10.1947 13.413 10.588C13.8063 10.9813 14.002 11.452 14 12C13.998 12.548 13.8023 13.019 13.413 13.413C13.0237 13.807 12.5527 14.0027 12 14ZM18 14C17.45 14 16.9793 13.8043 16.588 13.413C16.1967 13.0217 16.0007 12.5507 16 12C15.9993 11.4493 16.1953 10.9787 16.588 10.588C16.9807 10.1973 17.4513 10.0013 18 10C18.5487 9.99867 19.0197 10.1947 19.413 10.588C19.8063 10.9813 20.002 11.452 20 12C19.998 12.548 19.8023 13.019 19.413 13.413C19.0237 13.807 18.5527 14.0027 18 14Z'
};

function MoreIcon(props: MoreIconProps) {
  const { isDefaultFill, type = 'horizontal', ...otherProps } = props;

  return (
    <svg
      fill={ isDefaultFill ? 'currentColor' : '--neutral-80' }
      viewBox={ '0 0 24 24' }
      xmlns={ 'http://www.w3.org/2000/svg' }
      { ...otherProps }
    >
      <path d={ MoreTypes[type] } />
    </svg>
  );
}

export { MoreIcon };
