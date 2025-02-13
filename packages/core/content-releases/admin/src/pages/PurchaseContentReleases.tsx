import { Layouts } from '@strapi/admin/strapi-admin';
import { Box, Main, Flex, Typography, Grid, LinkButton } from '@strapi/design-system';
import { ExternalLink, Check, PaperPlane } from '@strapi/icons';
import { useIntl } from 'react-intl';

import illustration from '../assets/purchase-page-illustration.svg';

const PurchaseContentReleases = () => {
  const { formatMessage } = useIntl();

  return (
    <Layouts.Root>
      <Main>
        <Layouts.Header
          title={formatMessage({
            id: 'content-releases.pages.Releases.title',
            defaultMessage: 'Releases',
          })}
          subtitle={formatMessage({
            id: 'content-releases.pages.PurchaseRelease.subTitle',
            defaultMessage: 'Manage content updates and releases.',
          })}
        />

        <Box marginLeft={10} marginRight={10} shadow="filterShadow" hasRadius background="neutral0">
          <Grid.Root>
            <Grid.Item col={6} s={12}>
              <Flex direction="column" alignItems="flex-start" padding={7} gap={2}>
                <Flex>
                  <PaperPlane fill="primary600" width={`24px`} height={`24px`} />
                </Flex>
                <Flex paddingTop={2} paddingBottom={2}>
                  <Typography variant="beta" fontWeight="bold">
                    Group content and publish updates together
                  </Typography>
                </Flex>

                <Flex gap={1}>
                  <Check fill="success500" width={`16px`} height={`16px`} />
                  <Typography textColor="neutral700">Add many entries to releases</Typography>
                </Flex>

                <Flex gap={1}>
                  <Check fill="success500" width={`16px`} height={`16px`} />
                  <Typography textColor="neutral700">
                    Quickly identify entries containing errors
                  </Typography>
                </Flex>

                <Flex gap={1}>
                  <Check fill="success500" width={`16px`} height={`16px`} />
                  <Typography textColor="neutral700">
                    Schedule their publication, or publish them manually
                  </Typography>
                </Flex>

                <Flex gap={3} marginTop={4}>
                  <LinkButton
                    variant="default"
                    href="https://strapi.io/pricing-self-hosted?utm_campaign=In-Product-CTA&utm_source=Releases"
                  >
                    Upgrade
                  </LinkButton>
                  <LinkButton
                    variant="tertiary"
                    endIcon={<ExternalLink />}
                    href="https://strapi.io/features/releases?utm_campaign=In-Product-CTA&utm_source=Releases"
                  >
                    Learn more
                  </LinkButton>
                </Flex>
              </Flex>
            </Grid.Item>
            <Grid.Item col={6} s={12} background="primary100">
              <img src={illustration} alt="" width={'100%'} height="auto" />
            </Grid.Item>
          </Grid.Root>
        </Box>
      </Main>
    </Layouts.Root>
  );
};

export { PurchaseContentReleases };
