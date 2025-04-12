import type { TSelectContextValue } from '../types/TSelectContextValue';
import type { TSelectProps } from '../types/TSelectProps';
import { useClickOutside } from '@shared/hooks';
import { ChevronIcon } from '@shared/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { Children, cloneElement, isValidElement, memo, useCallback, useMemo, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import st from './Select.module.scss';
import { SelectContextProvider } from './SelectContext';

function Select(props: TSelectProps) {
  const { children, defaultOption, icon, onSelected, placeholder, placementDropdown = 'right', selected } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scope, { width }] = useMeasure();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const listTitleRef = useRef<(null | string)[]>([]);
  const listBoxRef = useRef<HTMLDivElement>(null);

  useClickOutside(listBoxRef, () => setIsOpen(false));

  const onOptionClick = useCallback(
    (value: string) => {
      setIsOpen(false);

      onSelected(value);
    },
    [onSelected]
  );

  const onComboBoxClick = () => {
    if (!listBoxRef.current)
      setIsOpen(prev => !prev);
  };

  const contextValue = useMemo(
    () =>
      ({
        activeIndex,
        isOpen,
        listTitleRef,
        onChange: onOptionClick,
        selected,
        selectedIndex,
        setActiveIndex,
        setSelectedIndex
      }) as TSelectContextValue,
    [activeIndex, isOpen, onOptionClick, selected, selectedIndex]
  );

  return (
    <SelectContextProvider value={ contextValue }>
      <motion.div animate={ { width } } className={ clsx(st.selectWrapper, st[placementDropdown]) } role={ 'listbox' }>
        <div className={ st.hiddenLabel } id={ `select-${placeholder}` }>
          {placeholder}
        </div>
        <button
          type={ 'button' }
          aria-activedescendant={ `option-${selectedIndex}` }
          aria-controls={ `listbox-${placeholder}` }
          aria-expanded={ isOpen }
          aria-haspopup={ 'listbox' }
          aria-labelledby={ `select-${placeholder}` }
          className={ clsx(st.combobox, isOpen && st.comboboxOpen) }
          onClick={ onComboBoxClick }
          ref={ scope }
          role={ 'combobox' }
          tabIndex={ 0 }
        >
          {icon}
          <span>{selected !== defaultOption ? listTitleRef.current?.[selectedIndex] : placeholder}</span>
          <ChevronIcon className={ clsx(st.arrow, isOpen && st.arrowOpen) } type={ 'bottom' } />
        </button>
        <AnimatePresence>
          {isOpen
            ? (
                <motion.div
                  animate={ { height: 'fit-content', opacity: 1, padding: '6 6' } }
                  aria-labelledby={ `select-${placeholder}` }
                  className={ st.listbox }
                  exit={ { height: 0, opacity: 0, padding: '0 6' } }
                  id={ `listbox-${placeholder}` }
                  initial={ { height: 0, opacity: 0, padding: '0 6' } }
                  ref={ listBoxRef }
                  role={ 'listbox' }
                  tabIndex={ -1 }
                >
                  <p className={ st.placeholder } role={ 'presentation' }>
                    {placeholder}
                  </p>
                  {/* !TODO: alternative implementation */}
                  { /* eslint-disable-next-line react/no-children-map */}
                  {Children.map(
                    children,
                    (child, index) =>
                      isValidElement(child)
                      // eslint-disable-next-line react/no-clone-element
                      && cloneElement(child, {
                        // @ts-expect-error - It will be replaced in the future.
                        ...child.props,
                        // @ts-expect-error - It will be replaced in the future.
                        index: child.props?.index || index + 1
                      })
                  )}
                </motion.div>
              )
            : null}
        </AnimatePresence>
      </motion.div>
    </SelectContextProvider>
  );
}

export default memo(Select);
