import AuthDirective from "./auth/auth"
import RestrictionDirective from "./auth/restricted"
import SensitivDirective from "./auth/sensitive"
import SubscriptionDirective from "./auth/subscription"

import SignUpValidation from "./user/signUpValidation"
import SignInValidation from "./user/signInValidation"
import ChangeRoleValidation from "./user/changeRoleValidation"
import UpdateUserValidation from "./user/updateUserValidation"
import ResetMailValidation from "./user/resetMailValidation"
import InviteMailValidation from "./user/inviteMailValidation"

import ChannelIdValidation from "./channel/channelIdValidation"
import CreateChannelValidation from "./channel/createChannelValidation"
import ReorderChannelsValidation from "./channel/reorderChannelsValidation"
import CreatePrivateChannelValidation from "./channel/createPrivateChannelValidation"
import AddUserToChannelValidation from "./channel/addUserToChannelValidation"
import RemoveUserFromChannelValidation from "./channel/removeUserFromChannelValidation"
import UpdateChannelValidation from "./channel/updateChannelValidation"

import UpdateConfigValidation from "./config/updateConfigValidation"

import CreateMessageValidation from "./message/createMessageValidation"
import UpdateMessageValidation from "./message/updateMessageValidation"
import ReactionValidation from "./message/reactionValidation"

export default {
	auth: AuthDirective,
	restricted: RestrictionDirective,
	sensitive: SensitivDirective,
	subscription: SubscriptionDirective,
	signUpValidation: SignUpValidation,
	signInValidation: SignInValidation,
	changeRoleValidation: ChangeRoleValidation,
	updateUserValidation: UpdateUserValidation,
	resetMailValidation: ResetMailValidation,
	inviteMailValidation: InviteMailValidation,

	channelIdValidation: ChannelIdValidation,
	createChannelValidation: CreateChannelValidation,
	reorderChannelsValidation: ReorderChannelsValidation,
	createPrivateChannelValidation: CreatePrivateChannelValidation,
	addUserToChannelValidation: AddUserToChannelValidation,
	removeUserFromChannelValidation: RemoveUserFromChannelValidation,
	updateChannelValidation: UpdateChannelValidation,

	updateConfigValidation: UpdateConfigValidation,

	createMessageValidation: CreateMessageValidation,
	updateMessageValidation: UpdateMessageValidation,
	reactionValidation: ReactionValidation
}
