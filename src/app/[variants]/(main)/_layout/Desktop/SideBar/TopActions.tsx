import { ActionIcon, ActionIconProps } from '@lobehub/ui';
import { BookUser, MessageSquare, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 40,
  size: 24,
  strokeWidth: 2,
};

export interface TopActionProps {
  isPinned?: boolean | null;
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab, isPinned }) => {
  const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);

  const isChatActive = tab === SidebarTabKey.Chat && !isPinned;
  const isCustomerManagementActive = tab === SidebarTabKey.CustomerManagement;
  const isEmployeeManagementActive = tab === SidebarTabKey.EmployeeManagement;

  return (
    <Flexbox gap={8}>
      <Link
        aria-label={t('tab.chat')}
        href={'/chat'}
        onClick={(e) => {
          // If Cmd key is pressed, let the default link behavior happen (open in new tab)
          if (e.metaKey || e.ctrlKey) {
            return;
          }

          // Otherwise, prevent default and switch session within the current tab
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
      >
        <ActionIcon
          active={isChatActive}
          icon={MessageSquare}
          size={ICON_SIZE}
          title={t('tab.chat')}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
      <Link aria-label={"客户管理"} href={'/customer'}>
        <ActionIcon
          active={isCustomerManagementActive}
          icon={BookUser}
          size={ICON_SIZE}
          title={"客户管理"}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
      <Link aria-label={"员工管理"} href={'/employee'}>
        <ActionIcon
          active={isEmployeeManagementActive}
          icon={UsersRound}
          size={ICON_SIZE}
          title={"员工管理"}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
    </Flexbox>
  );
});

export default TopActions;
