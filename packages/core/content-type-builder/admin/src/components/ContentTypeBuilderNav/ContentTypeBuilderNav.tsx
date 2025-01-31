import { Fragment } from 'react';

import {
  Box,
  TextButton,
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavLinkSection,
  SubNavSection,
  SubNavSections,
  TextInput,
  Button,
  Flex,
} from '@strapi/design-system';
import { Check, Plus, Search } from '@strapi/icons';
import upperFirst from 'lodash/upperFirst';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

import { getTrad } from '../../utils/getTrad';
import { useDataManager } from '../DataManager/useDataManager';

import { useContentTypeBuilderMenu } from './useContentTypeBuilderMenu';

const SubNavLinkCustom = styled(SubNavLink)`
  div {
    width: inherit;
    span:nth-child(2) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: inherit;
    }
  }
`;

const Circle = styled.span<{ status: string }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'UNCHANGED':
        return theme.colors.neutral500;
      case 'CHANGED':
        return theme.colors.warning500;
      case 'REMOVED':
        return theme.colors.danger500;
      case 'NEW':
        return theme.colors.success500;
    }
  }};
  margin-left: 1rem;
  display: inline-block;
`;

export const ContentTypeBuilderNav = () => {
  const { menu, search } = useContentTypeBuilderMenu();
  const { saveSchema, isModified } = useDataManager();
  const { formatMessage } = useIntl();

  const pluginName = formatMessage({
    id: getTrad('plugin.name'),
    defaultMessage: 'Content-Type Builder',
  });

  return (
    <SubNav aria-label={pluginName}>
      <SubNavHeader label={pluginName} />
      <Flex padding={4} gap={4} direction={'column'}>
        <Button
          startIcon={<Check />}
          onClick={(e) => {
            e.preventDefault();
            // TODO: add confirmation prompt?
            saveSchema();
          }}
          type="submit"
          disabled={!isModified}
          fullWidth
        >
          {formatMessage({
            id: 'global.save',
            defaultMessage: 'Save',
          })}
        </Button>

        <TextInput
          startAction={<Search />}
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          aria-label="Search"
          placeholder={formatMessage({
            id: getTrad('search.placeholder'),
            defaultMessage: 'Search',
          })}
        />
      </Flex>
      <SubNavSections>
        {menu.map((section) => (
          <Fragment key={section.name}>
            <SubNavSection
              label={formatMessage({
                id: section.title.id,
                defaultMessage: section.title.defaultMessage,
              })}
              collapsable
              badgeLabel={section.linksCount.toString()}
            >
              {section.links.map((link) => {
                const linkLabel = upperFirst(
                  formatMessage({ id: link.name, defaultMessage: link.title })
                );

                if (link.links) {
                  return (
                    <SubNavLinkSection key={link.name} label={upperFirst(link.title)}>
                      {link.links.map((subLink: any) => {
                        const label = upperFirst(
                          formatMessage({ id: subLink.name, defaultMessage: subLink.title })
                        );

                        return (
                          <SubNavLink
                            tag={NavLink}
                            to={subLink.to}
                            active={subLink.active}
                            key={subLink.name}
                            isSubSectionChild
                          >
                            {subLink.status && subLink.status === 'REMOVED' ? (
                              <s>{label}</s>
                            ) : (
                              label
                            )}
                            <Circle status={subLink.status} />
                          </SubNavLink>
                        );
                      })}
                    </SubNavLinkSection>
                  );
                }

                return (
                  <SubNavLinkCustom
                    tag={NavLink}
                    to={link.to}
                    active={link.active}
                    key={link.name}
                    width="100%"
                  >
                    {link.status && link.status === 'REMOVED' ? <s>{linkLabel}</s> : linkLabel}
                    <Circle status={link.status} />
                  </SubNavLinkCustom>
                );
              })}
            </SubNavSection>
            {section.customLink && (
              <Box paddingLeft={7}>
                <TextButton
                  onClick={section.customLink.onClick}
                  startIcon={<Plus width="0.8rem" height="0.8rem" />}
                  marginTop={2}
                  cursor="pointer"
                >
                  {formatMessage({
                    id: section.customLink.id,
                    defaultMessage: section.customLink.defaultMessage,
                  })}
                </TextButton>
              </Box>
            )}
          </Fragment>
        ))}
      </SubNavSections>
    </SubNav>
  );
};
