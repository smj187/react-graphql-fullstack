import React from "react"
import styled from "styled-components"

import { Group } from "styled-icons/material/Group"
import { Conversation } from "styled-icons/boxicons-solid/Conversation"
import { UserPlus } from "styled-icons/boxicons-solid/UserPlus"
import { Slider } from "styled-icons/boxicons-regular/Slider"
import { AccountBox } from "styled-icons/remix-fill/AccountBox"
import { SignOutAlt } from "styled-icons/fa-solid/SignOutAlt"
import { SignInAlt } from "styled-icons/fa-solid/SignInAlt"
import { Close } from "styled-icons/remix-line/Close"

import { SortAlphaAsc } from "styled-icons/icomoon/SortAlphaAsc"
import { SortAlphaDesc } from "styled-icons/icomoon/SortAlphaDesc"
import { SortNumericAsc } from "styled-icons/icomoon/SortNumericAsc"
import { SortNumbericDesc } from "styled-icons/icomoon/SortNumbericDesc"

import { Trash } from "styled-icons/fa-solid/Trash"
import { UserDetail } from "styled-icons/boxicons-solid/UserDetail"
import { AddressCard } from "styled-icons/fa-regular/AddressCard"
import { UserSlash } from "styled-icons/fa-solid/UserSlash"
import { ExclamationTriangle } from "styled-icons/fa-solid/ExclamationTriangle"
import { Search } from "styled-icons/material/Search"

import { Lock2 } from "styled-icons/remix-fill/Lock2"
import { Edit } from "styled-icons/boxicons-solid/Edit"
import { MoreVert } from "styled-icons/material/MoreVert"
import { AddBox } from "styled-icons/material/AddBox"

import { Visibility } from "styled-icons/material/Visibility"
import { VisibilityOff } from "styled-icons/material/VisibilityOff"

import { CheckboxChecked } from "styled-icons/icomoon/CheckboxChecked"
import { CheckboxUnchecked } from "styled-icons/icomoon/CheckboxUnchecked"

import { Settings } from "styled-icons/material/Settings"
import { FileAdd } from "styled-icons/remix-fill/FileAdd"
import { Error } from "styled-icons/boxicons-solid/Error"
import { FileVideo } from "styled-icons/fa-solid/FileVideo"
import { FileAudio } from "styled-icons/fa-regular/FileAudio"
import { File } from "styled-icons/boxicons-solid/File"
import { FileImage } from "styled-icons/boxicons-solid/FileImage"
import { Plus } from "styled-icons/octicons/Plus"

// styled-icons/fa-regular/AddressCard

const Container = styled.div`
	color: ${({ theme }) => theme.color9};
`

export const Icon = ({ name, size = 16, ...rest }) => (
	<Container {...rest}>
		{(name === "Group" && <Group size={size} />) ||
			(name === "Conversation" && <Conversation size={size} />) ||
			(name === "UserPlus" && <UserPlus size={size} />) ||
			(name === "Slider" && <Slider size={size} />) ||
			(name === "AccountBox" && <AccountBox size={size} />) ||
			(name === "SignOutAlt" && <SignOutAlt size={size} />) ||
			(name === "Close" && <Close size={size} />) ||
			(name === "SortAlphaAsc" && <SortAlphaAsc size={size} />) ||
			(name === "SortAlphaDesc" && <SortAlphaDesc size={size} />) ||
			(name === "SortNumericAsc" && <SortNumericAsc size={size} />) ||
			(name === "SortNumbericDesc" && <SortNumbericDesc size={size} />) ||
			(name === "Trash" && <Trash size={size} />) ||
			(name === "UserDetail" && <UserDetail size={size} />) ||
			(name === "UserSlash" && <UserSlash size={size} />) ||
			(name === "ExclamationTriangle" && <ExclamationTriangle size={size} />) ||
			(name === "Search" && <Search size={size} />) ||
			(name === "Lock2" && <Lock2 size={size} />) ||
			(name === "Edit" && <Edit size={size} />) ||
			(name === "MoreVert" && <MoreVert size={size} />) ||
			(name === "AddBox" && <AddBox size={size} />) ||
			(name === "AddressCard" && <AddressCard size={size} />) ||
			(name === "VisibilityOff" && <VisibilityOff size={size} />) ||
			(name === "Visibility" && <Visibility size={size} />) ||
			(name === "CheckboxChecked" && <CheckboxChecked size={size} />) ||
			(name === "CheckboxUnchecked" && <CheckboxUnchecked size={size} />) ||
			(name === "Settings" && <Settings size={size} />) ||
			(name === "FileAdd" && <FileAdd size={size} />) ||
			(name === "Error" && <Error size={size} />) ||
			(name === "FileVideo" && <FileVideo size={size} />) ||
			(name === "File" && <File size={size} />) ||
			(name === "FileAudio" && <FileAudio size={size} />) ||
			(name === "FileImage" && <FileImage size={size} />) ||
			(name === "Plus" && <Plus size={size} />) ||
			(name === "SignInAlt" && <SignInAlt size={size} />)}
	</Container>
)
