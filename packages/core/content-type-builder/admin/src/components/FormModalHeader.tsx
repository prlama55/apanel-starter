/**
 *
 * FormModalHeader
 *
 */
import { Box, Flex, Breadcrumbs, Crumb, Link, Modal } from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import upperFirst from 'lodash/upperFirst';
import { useIntl } from 'react-intl';

import { useFormModalNavigation } from '../hooks/useFormModalNavigation';
import { getTrad } from '../utils';

import { AttributeIcon, IconByType } from './AttributeIcon';
import { useDataManager } from './DataManager/useDataManager';

import type { Internal } from '@strapi/types';

interface Header {
  label: string;
  info?: { category: string; name: string };
}

type BaseProps = {
  actionType?: string | null;
  attributeName: string;
  attributeType: IconByType;
  categoryName: string;
  contentTypeKind: IconByType;
  dynamicZoneTarget: string;
  modalType: string | null;
  customFieldUid?: string | null;
  showBackLink?: boolean;
};

type FormModalHeaderProps = BaseProps &
  (
    | { forTarget: 'component'; targetUid: Internal.UID.Component }
    | { forTarget: 'contentType'; targetUid: Internal.UID.ContentType }
  );

export const FormModalHeader = ({
  actionType = null,
  attributeName,
  attributeType,
  categoryName,
  contentTypeKind,
  dynamicZoneTarget,
  forTarget,
  modalType = null,
  targetUid,
  customFieldUid = null,
  showBackLink = false,
}: FormModalHeaderProps) => {
  const { formatMessage } = useIntl();
  const { components, contentTypes } = useDataManager();
  const { onOpenModalAddField } = useFormModalNavigation();

  let icon: IconByType = 'component';
  let headers: Header[] = [];

  const type = forTarget === 'component' ? components[targetUid] : contentTypes[targetUid];

  const displayName = type?.schema.displayName;

  if (modalType === 'contentType') {
    icon = contentTypeKind;
  }

  if (['component', 'editCategory'].includes(modalType || '')) {
    icon = 'component';
  }

  const isCreatingMainSchema = ['component', 'contentType'].includes(modalType || '');

  if (isCreatingMainSchema) {
    let headerId = getTrad(`modalForm.component.header-${actionType}`);

    if (modalType === 'contentType') {
      headerId = getTrad(`modalForm.${contentTypeKind}.header-create`);
    }

    if (actionType === 'edit') {
      headerId = getTrad(`modalForm.header-edit`);
    }

    return (
      <Modal.Header>
        <Flex>
          <Box>
            <AttributeIcon type={icon} />
          </Box>
          <Box paddingLeft={3}>
            <Modal.Title>{formatMessage({ id: headerId }, { name: displayName })}</Modal.Title>
          </Box>
        </Flex>
      </Modal.Header>
    );
  }

  headers = [
    {
      label: displayName,
      info: { category: type?.category || null, name: type?.schema.displayName },
    },
  ];

  if (modalType === 'chooseAttribute') {
    icon = ['component', 'components'].includes(forTarget) ? 'component' : type.schema.kind;
  }

  if (modalType === 'addComponentToDynamicZone') {
    icon = 'dynamiczone';
    headers.push({ label: dynamicZoneTarget });
  }

  if (modalType === 'attribute' || modalType === 'customField') {
    icon = attributeType;
    headers.push({ label: attributeName });
  }

  if (modalType === 'editCategory') {
    const label = formatMessage({
      id: getTrad('modalForm.header.categories'),
      defaultMessage: 'Categories',
    });

    headers = [{ label }, { label: categoryName }];
  }

  return (
    <Modal.Header>
      <Flex gap={3}>
        {showBackLink && (
          // This is a workaround and should use the LinkButton with a variant that currently doesn't exist
          <Link
            aria-label={formatMessage({
              id: getTrad('modalForm.header.back'),
              defaultMessage: 'Back',
            })}
            startIcon={<ArrowLeft />}
            onClick={() => onOpenModalAddField({ forTarget, targetUid })}
            href="#back"
            isExternal={false}
          />
        )}
        <AttributeIcon type={icon} customField={customFieldUid} />

        <Breadcrumbs label={headers.map(({ label }) => label).join(',')}>
          {headers.map(({ label, info }, index, arr) => {
            label = upperFirst(label);

            if (!label) {
              return null;
            }

            const key = `${label}.${index}`;

            if (info?.category) {
              label = `${label} (${upperFirst(info.category)} - ${upperFirst(info.name)})`;
            }

            return (
              <Crumb isCurrent={index === arr.length - 1} key={key}>
                {label}
              </Crumb>
            );
          })}
        </Breadcrumbs>
      </Flex>
    </Modal.Header>
  );
};
