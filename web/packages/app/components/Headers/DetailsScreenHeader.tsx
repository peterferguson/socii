import { useChatOverlayContext } from "app/components/Chat/context/ChatOverlayContext";
import { ScreenHeader } from "app/components/Chat/ScreenHeader";
import { AddUser } from "app/components/Icons/AddUser";
import { useStream, useStreamChatTheme, useChannelMembersStatus } from "app/hooks";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useChannelPreviewDisplayName } from "stream-chat-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export const DetailsScreenHeader = ({ channel }) => {
  const {
    colors: { accent_blue, white },
  } = useStreamChatTheme();
  const { client } = useStream();

  const { setOverlay: setAppOverlay } = useChatOverlayContext();
  const membersStatus = useChannelMembersStatus(channel);
  // @ts-ignore
  const displayName = useChannelPreviewDisplayName(channel, 30);

  /**
   * Cancels the confirmation sheet.
   */
  const openAddMembersSheet = () => {
    if (client?.user?.id) {
      // @ts-ignore
      setBottomSheetOverlayData({ channel });
      setAppOverlay("addMembers");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: white }}>
      <ScreenHeader
        inSafeArea
        RightContent={() => (
          <TouchableOpacity onPress={openAddMembersSheet}>
            <AddUser fill={accent_blue} height={24} width={24} />
          </TouchableOpacity>
        )}
        subtitleText={membersStatus}
        titleText={displayName} />
    </SafeAreaView>
  );
};
