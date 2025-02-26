import { Fragment, useEffect, useState, type MouseEventHandler } from "react";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";
import {
  hasNotificationBrowserSupport,
  hasSomeStoragePanelsWebNotificationEnabled,
  NOTIFICATION_PERMISSION_TYPES,
  type PanelsWebNotification,
} from "utils/dashboards";
import NotificationIcon from "ui/components/Icons/Notification";
import Tooltip, { TooltipIcon } from "ui/components/Tooltip";
import Dialog from "ui/components/Dialog";
import Input from "ui/components/Input";
import VisuallyHidden from "ui/components/VisuallyHidden";
import { slugify } from "ui/utils/slugify";
import * as css from "./WebNotification.styled";

// Check whether browser supports the promise version of requestPermission()
// legacy Safari only supports the old callback-based version
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

export interface WebNotificationProps {
  panels: PanelsWebNotification;
  onChange: (enabled: boolean) => void;
}

const WebNotification = ({
  panels: initialPanels,
  onChange,
}: WebNotificationProps) => {
  const { getItem, setItem } = useLocalStorage();
  const notificationsEnabledInStorage = getItem(LocalStorage.NOTIFICATIONS);
  // this is just to make sure that this component re-renders when the storage changes
  const [notificationsToggle, setNotificationsToggle] = useState<boolean>(
    notificationsEnabledInStorage === true
  );
  const [notificationsPermissionDenied, setNotificationsPermissionDenied] =
    useState<boolean>(
      !hasNotificationBrowserSupport() ||
        Notification.permission === NOTIFICATION_PERMISSION_TYPES.Denied
    );
  const [panels, setPanels] = useState<PanelsWebNotification>(initialPanels);
  const [panelsNotificationsOpen, setPanelsNotificationsOpen] =
    useState<boolean>(false);

  useEffect(function onInitialLoad() {
    if (!hasNotificationBrowserSupport()) {
      return;
    }

    // Check if the user hasn't granted permission yet and reset session storage to respect user prefs
    if (Notification.permission !== NOTIFICATION_PERMISSION_TYPES.Granted) {
      setItem(LocalStorage.NOTIFICATIONS, "false");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  const handleNotificationPermissionRequested = (
    permission: NotificationPermission
  ) => {
    if (permission === NOTIFICATION_PERMISSION_TYPES.Granted) {
      setItem(LocalStorage.NOTIFICATIONS, "true");
      setNotificationsToggle(true);
      onChange(true);
    }
  };

  // snippet from: https://developer.mozilla.org/en-US/docs/Web/API/Notification#examples
  const onClickToggleNotifications: MouseEventHandler<
    HTMLDivElement
  > = async () => {
    if (!hasNotificationBrowserSupport()) {
      return;
    }

    // permission already granted
    if (Notification.permission === NOTIFICATION_PERMISSION_TYPES.Granted) {
      // Check whether notification permissions have already been granted;
      // if so, store in session storage so that dashboards can notify user if panels go in a bad state then
      setItem(
        LocalStorage.NOTIFICATIONS,
        String(!notificationsEnabledInStorage)
      );
      setNotificationsToggle((prev) => !prev);
      onChange(!notificationsEnabledInStorage);
    } else if (
      Notification.permission === NOTIFICATION_PERMISSION_TYPES.Denied
    ) {
      setNotificationsPermissionDenied(true);
    } else {
      // We need to ask the user for permission (again)
      if (checkNotificationPromise()) {
        Notification.requestPermission().then(
          handleNotificationPermissionRequested
        );
      } else {
        Notification.requestPermission(handleNotificationPermissionRequested);
      }
    }

    // At last, if the user has denied notifications, and you want to be respectful there is no need to bother them anymore.
  };

  // show notification as active if toggle is on and there are panels actively listening for notifications
  const isNotificationButtonActive =
    notificationsToggle && hasSomeStoragePanelsWebNotificationEnabled();

  return (
    <Dialog.Root
      open={panelsNotificationsOpen}
      onOpenChange={(open) => {
        if (notificationsPermissionDenied) {
          return;
        }

        setPanelsNotificationsOpen(open);
      }}
    >
      <css.Container>
        <Dialog.Trigger asChild>
          <css.NotificationButton
            onClick={onClickToggleNotifications}
            tabIndex={0}
            role="button"
            active={isNotificationButtonActive}
            disabled={notificationsPermissionDenied}
          >
            {notificationsPermissionDenied ? (
              <Tooltip
                content="Please enable browser notifications from your browser settings to
            receive alerts. If you're on mobile, try adding first the website to the Home Screen."
                variant="dark"
              >
                <TooltipIcon>
                  <NotificationIcon
                    width={16}
                    height={16}
                    title="Enable Notifications"
                  />
                </TooltipIcon>
              </Tooltip>
            ) : (
              <NotificationIcon
                width={16}
                height={16}
                title="Enable Notifications"
              />
            )}
          </css.NotificationButton>
        </Dialog.Trigger>
      </css.Container>
      <Dialog.Content Portal={Fragment} variant="darkSeti" overlay>
        <Dialog.Title asChild>
          <css.LabelContainer>
            <css.Label xs={2} small={2} medium={3}>
              Web Notification
            </css.Label>
          </css.LabelContainer>
        </Dialog.Title>
        <VisuallyHidden>
          <Dialog.Description>
            Select dashboard panels to enable Web Notifications
          </Dialog.Description>
        </VisuallyHidden>
        <css.PanelsContainer>
          {Object.entries(panels).map(([heading, value]) => {
            const id = slugify(heading);

            return (
              <css.Panel key={id} xs={2} small={2} medium={3}>
                <Input
                  id={id}
                  name={id}
                  label={heading}
                  type="checkbox"
                  checked={value}
                  onChange={(e) => {
                    const updatedPanels = {
                      ...panels,
                      [heading]: e.target.checked,
                    };

                    setPanels(updatedPanels);
                    setItem(
                      LocalStorage.NOTIFICATIONS_PANELS,
                      JSON.stringify(updatedPanels)
                    );
                  }}
                />
              </css.Panel>
            );
          })}
        </css.PanelsContainer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WebNotification;
