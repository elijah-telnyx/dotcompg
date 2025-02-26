import { useRouter } from 'next/router';
import * as css from './AdminTools.styled';
import { spaces } from 'lib/Contentful';
import { ExternalIcon } from 'ui/components/Link/Link.styled';
import constants from 'constants/env';

interface AdminToolsProps {
  preview: boolean;
  pageId?: string;
}

export const REVALIDATE_CLICK_COUNT_MAX = 3;

const onPreviewToggle = (url: string) => async () => {
  try {
    const response = await fetch(url, {
      headers: new Headers({
        'Cache-Control': 'no-cache',
      }),
    });

    if (response.ok && response.redirected) {
      window.location.assign(response.url);
      return;
    }

    throw new Error('Unexpected Error', { cause: await response.json() });
  } catch (e) {
    console.error(e);
  }
};

const ExitPreview = () => (
  <css.Button onClick={onPreviewToggle(`/api/preview-exit?slug=${window.location.pathname}`)}>
    Disable Preview Mode
  </css.Button>
);

const EnterPreview = () => (
  <css.Button onClick={onPreviewToggle(`/api/preview?slug=${window.location.pathname}`)}>
    Enable Preview Mode
  </css.Button>
);

const RevalidateButton = () => {
  const postToRevalidate = async () => {
    const response = await fetch(`/api/revalidate?path=${window.location.pathname}`);
    const json = await response.json();
    if (json.status === 'error') {
      alert(`Error: ${json.message}`);
    }
    if (json.status === 'ok') {
      alert(`Page ${window.location.pathname} revalidated!`);
    }
  };
  return <css.Button onClick={postToRevalidate}>Revalidate Page in Production</css.Button>;
};

const PurgeCFCache = () => {
  const purgeCache = async () => {
    const response = await fetch(`/api/cf-purge`, {
      body: JSON.stringify({ purge_everything: true }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());

    if (response.success) {
      alert(`Cache purged! id: ${response.result.id}`);
    } else {
      alert('Error purging cache');
    }
  };

  return <css.Button onClick={purgeCache}>Purge Cloudflare Cache</css.Button>;
};

const PageEntry = ({ pageId }: { pageId: string }) => {
  const { pathname } = useRouter();

  const isBlogOverview =
    pathname === '/resources' || pathname.includes('/resources/topic') || pathname.includes('/resources/page');
  const isReleaseNotesOverview =
    pathname === '/release-notes' ||
    pathname.includes('/release-notes/tag') ||
    pathname.includes('/release-notes/page');
  const isBlog = pathname.includes('/resources');
  const isReleaseNotes = pathname.includes('/release-notes');

  if (isBlogOverview) {
    return (
      <css.Button
        as='a'
        href='https://strapi.telnyx.tech/admin/content-manager/single-types/api::page-resource-center-landing-page-container.page-resource-center-landing-page-container'
        target='_blank'
      >
        Page Entry (Strapi) <ExternalIcon style={{ width: '1em', height: '1em' }} />
      </css.Button>
    );
  }

  if (isReleaseNotesOverview) {
    return (
      <css.Button
        as='a'
        href='https://strapi.telnyx.tech/admin/content-manager/single-types/api::page-release-notes-landing-page-container.page-release-notes-landing-page-container'
        target='_blank'
      >
        Page Entry (Strapi) <ExternalIcon style={{ width: '1em', height: '1em' }} />
      </css.Button>
    );
  }

  if (isBlog) {
    return (
      <css.Button
        as='a'
        href={`https://strapi.telnyx.tech/admin/content-manager/collection-types/api::rc-post.rc-post/${pageId}`}
        target='_blank'
      >
        Page Entry (Strapi) <ExternalIcon style={{ width: '1em', height: '1em' }} />
      </css.Button>
    );
  }

  if (isReleaseNotes) {
    return (
      <css.Button
        as='a'
        href={`https://strapi.telnyx.tech/admin/content-manager/collection-types/api::component-release-note-item.component-release-note-item/${pageId}`}
        target='_blank'
      >
        Page Entry (Strapi) <ExternalIcon style={{ width: '1em', height: '1em' }} />
      </css.Button>
    );
  }

  return (
    <css.Button
      as='a'
      href={`https://app.contentful.com/spaces/${spaces.rebrand2022}/entries/${pageId}`}
      target='_blank'
    >
      Page Entry <ExternalIcon style={{ width: '1em', height: '1em' }} />
    </css.Button>
  );
};

export function AdminTools({ preview, pageId }: AdminToolsProps) {
  const router = useRouter();

  const passphrase = router.query.passphrase as string;

  return (
    <css.Menu id='admin-tool-menu'>
      {passphrase === constants.cloudflareCache.passphrase && <PurgeCFCache />}
      {pageId && <PageEntry pageId={pageId} />}
      <RevalidateButton />
      {preview ? <ExitPreview /> : <EnterPreview />}
    </css.Menu>
  );
}

export default AdminTools;
