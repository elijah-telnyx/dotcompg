import { useState, type MouseEvent, type ReactNode } from 'react';
import { useRouter } from 'next/router';
import CTA from '../Typography/CTA';
import * as css from './Select.styled';
import * as ReactSelect from '@radix-ui/react-select';
import Heading from '../Typography/Heading';
import { Checkmark } from '../Icons';
import VisuallyHidden from '../VisuallyHidden';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';

export interface SelectItemProps {
  name: string;
  value: string;
  selectedValue?: string;
  // used in render links and to change route using JS
  href?: string;
  items?: SelectItemProps[];
  resetLink?: string;
  onReset?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface SelectProps extends ReactSelect.SelectProps {
  placeholder: string;
  items: SelectItemProps[];
  id?: string;
  resetLink?: string;
  value?: string;
  onValueChange?(item?: SelectItemProps['value']): void;
  renderLinks?: boolean;
  useRouterPush?: boolean;
  /**
   * Add hashId to the option link
   */
  hashLinkId?: string;
  scrollable?: boolean;
  /**
   * use this on client-only components to avoid being clipped by next section
   */
  portal?: boolean;
  triggerLabel?: string;
}

const ResetButton = ({ onReset }: Pick<SelectItemProps, 'onReset'>) => {
  return (
    <css.ItemIndicator>
      <button onClick={onReset}>
        <Checkmark />
      </button>
    </css.ItemIndicator>
  );
};

const SelectItem = ({
  name,
  value,
  selectedValue,
  onReset,
}: SelectItemProps) => {
  return (
    <css.SelectItemContainer>
      <css.Item value={value}>
        <ReactSelect.ItemText asChild>
          <CTA>{name}</CTA>
        </ReactSelect.ItemText>
      </css.Item>
      {value === selectedValue && onReset && <ResetButton onReset={onReset} />}
    </css.SelectItemContainer>
  );
};

const HiddenLinks = ({ items }: { items: SelectProps['items'] }) => {
  const Link = ({ href, name }: SelectItemProps) =>
    href ? (
      // these links are dynamically generated, so we have to force "munchkin no decorate"
      <a href={href} className='mchNoDecorate'>
        {name}
      </a>
    ) : null;

  return (
    <VisuallyHidden>
      {items.map(({ items, ...item }) =>
        items ? (
          items.map((innerItem) => (
            <Link {...innerItem} key={innerItem.value} />
          ))
        ) : (
          <Link {...item} key={item.value} />
        )
      )}
    </VisuallyHidden>
  );
};

const Portal = ({ children }: { children: ReactNode }) => {
  // this is necessary because telnyxdotcom injects fonts in the main container, not in the body
  const [element, setElement] = useState<HTMLElement | null>(null);

  useBrowserLayoutEffect(() => {
    setElement(document.querySelector('main'));
  }, []);

  return <css.Portal container={element}>{children}</css.Portal>;
};

const Content = ({
  children,
  portal,
}: {
  children: ReactNode;
  portal?: boolean;
}) => {
  if (portal) {
    return (
      <Portal>
        <css.Content>{children}</css.Content>
      </Portal>
    );
  }

  return <css.Content>{children}</css.Content>;
};

const Select = ({
  id,
  value: propValue,
  placeholder,
  items,
  renderLinks,
  resetLink,
  useRouterPush,
  scrollable = true,
  triggerLabel,
  portal,
  hashLinkId,
  defaultValue,
  ...props
}: SelectProps) => {
  const router = useRouter();
  const value = propValue ?? undefined;

  function onValueChange(selectedItemValue: string) {
    if (props.onValueChange) {
      props.onValueChange(selectedItemValue);
    }

    let selectedItemHref: string | undefined;

    // search in items and sub items
    items.forEach(({ value, items: groupItems, href }) => {
      if (selectedItemValue === value) {
        selectedItemHref = href;
      }

      if (!selectedItemHref && groupItems) {
        selectedItemHref = groupItems.find(
          ({ value }) => selectedItemValue === value
        )?.href;
      }
    });

    /**
     * This is necessary since radix-ui/react-select client-side js prevents default chain on anchor link click
     * @TODO remove this when it's fixed in radix-dropdown or when onClick event handling is available
     */
    if (!selectedItemHref) return;

    const href = `${selectedItemHref}${hashLinkId ? `#${hashLinkId}` : ''}`;
    if (useRouterPush) {
      router.push(href, undefined, { scroll: false });
    } else {
      window.location.href = href;
    }
  }

  const onReset = (event: MouseEvent<HTMLButtonElement>) => {
    if (props.onValueChange) {
      props.onValueChange(undefined);
      return;
    }

    if (resetLink) {
      event.stopPropagation();
      // used to redirect to initial page of the filter.
      router.push(resetLink, undefined, { scroll: false });
      return;
    }
  };

  return (
    <>
      <css.Wrapper>
        <css.Select
          value={value}
          defaultValue={defaultValue || value}
          onValueChange={onValueChange}
          key={props.onValueChange ? String(value) : 'select-component'} // to show placeholder again when value resets
          {...props}
        >
          <css.Trigger id={id} aria-label={triggerLabel} type={undefined}>
            <ReactSelect.Value placeholder={<CTA>{placeholder}</CTA>} />
            <css.Icon />
          </css.Trigger>

          <Content portal={portal}>
            <css.ScrollArea scrollable={scrollable}>
              <css.ContentViewport>
                <css.ScrollViewport>
                  {items.map(({ items: groupItems, ...item }) => {
                    const hasReset = props.onValueChange || resetLink;
                    if (groupItems?.length) {
                      return (
                        <ReactSelect.Group key={item.value}>
                          <css.GroupLabel asChild>
                            <Heading level={2} category htmlAs='div'>
                              {item.name}
                            </Heading>
                          </css.GroupLabel>
                          {groupItems.map((groupItem) => (
                            <SelectItem
                              key={groupItem.value}
                              {...groupItem}
                              selectedValue={value}
                              onReset={hasReset ? onReset : undefined}
                            />
                          ))}
                        </ReactSelect.Group>
                      );
                    }
                    return (
                      <SelectItem
                        key={item.value}
                        {...item}
                        selectedValue={value}
                        onReset={hasReset ? onReset : undefined}
                      />
                    );
                  })}
                </css.ScrollViewport>
              </css.ContentViewport>
              <css.ScrollBar>
                <css.ScrollThumb />
              </css.ScrollBar>
            </css.ScrollArea>
          </Content>
        </css.Select>
      </css.Wrapper>
      {renderLinks && <HiddenLinks items={items} />}
    </>
  );
};

export default Select;
