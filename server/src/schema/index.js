import { gql } from "apollo-server"

import userSchema from "./user"
import channelSchema from "./channel"
import configSchema from "./config"
import messageSchema from "./message"

const linkSchema = gql`
	scalar Date
	directive @auth on FIELD_DEFINITION
	directive @restricted(to: [Role]) on FIELD_DEFINITION
	directive @sensitive on FIELD_DEFINITION
	directive @subscription on FIELD_DEFINITION
	directive @skip(if: Boolean!) on FIELD_DEFINITION | FRAGMENT_SPREAD | INLINE_FRAGMENT

	directive @signUpValidation on FIELD_DEFINITION
	directive @signInValidation on FIELD_DEFINITION
	directive @changeRoleValidation on FIELD_DEFINITION
	directive @updateUserValidation on FIELD_DEFINITION
	directive @resetMailValidation on FIELD_DEFINITION
	directive @inviteMailValidation on FIELD_DEFINITION

	directive @channelIdValidation on FIELD_DEFINITION
	directive @createChannelValidation on FIELD_DEFINITION
	directive @reorderChannelsValidation on FIELD_DEFINITION
	directive @updateChannelValidation on FIELD_DEFINITION
	directive @createPrivateChannelValidation on FIELD_DEFINITION
	directive @addUserToChannelValidation on FIELD_DEFINITION
	directive @removeUserFromChannelValidation on FIELD_DEFINITION

	directive @updateConfigValidation on FIELD_DEFINITION

	directive @createMessageValidation on FIELD_DEFINITION
	directive @updateMessageValidation on FIELD_DEFINITION
	directive @reactionValidation on FIELD_DEFINITION

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`
export default [linkSchema, userSchema, channelSchema, configSchema, messageSchema]
