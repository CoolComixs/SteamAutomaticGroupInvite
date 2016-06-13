// ==UserScript==
// @name         Steam Automatic Group Invite
// @namespace    https://github.com/CoolComixs/SteamAutomaticGroupInvite
// @version      1.0.2
// @description  This script do it easy for you, when you like to invite some people to your Steam group.
// @author       ComixsYT, Originaly by Michael
// @match        *://steamcommunity.com/id/*
// @match        *://steamcommunity.com/profiles/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @downloadURL  https://raw.githubusercontent.com/CoolComixs/SteamAutomaticGroupInvite/master/autoInvite.user.js
// @updateURL    https://raw.githubusercontent.com/CoolComixs/SteamAutomaticGroupInvite/master/autoInvite.user.js
// @grant        none
// ==/UserScript==

//I (ComixsYT/Mitchell Reiff) nor doe steh original author (mandreasen/Michael Andreasen) take responsibiloty
//if you violate the Steam TOS. You have been warned!

//Set the group custom URL you want people to be invited to. (NOT THE FULL URL ONLY CUSTOM URL)
//For example, if your group URL is http://steamcommunity.com/groups/tradingllc, enter tradingllc in ""!

var steam_group_custom_url = "customURL";

function InviteUserToSteamGroup(group_id)
{
	var params = {
		json: 1,
		type: 'groupInvite',
		group: group_id,
		sessionID: g_sessionID,
		invitee: g_rgProfileData.steamid
	};

	$.ajax({
		url: isHttps() + '://steamcommunity.com/actions/GroupInvite',
		url: 'http://steamcommunity.com/actions/GroupInvite',
		data: params,
		type: 'POST',
		dataType: 'json'
	}).done(function(data) {
		if (data.duplicate) {
			console.log('[' + g_rgProfileData.steamid + '] The user are already in your group or have already received an invite.');
		} else {
			console.log('[' + g_rgProfileData.steamid + '] Invite user to join your Group.');
		}
	}).fail(function() {
		console.log('Error processing your request. Please try again.');
	});
}

function GetGroupData(steam_group_custom_url)
{
	return $.ajax({
		url: isHttps() + '://steamcommunity.com/groups/' + steam_group_custom_url + '/memberslistxml',
		url: 'http://steamcommunity.com/groups/' + steam_group_custom_url + '/memberslistxml',
		data: { xml:1 },
		type: 'GET',
		dataType: 'xml'
	}).done(function(xml) {
		InviteUserToSteamGroup($(xml).find('groupID64').text());
	}).fail(function() {
		console.log('The request failed or the group custom URL is incorrect.');
	});
}

function isHttps() {
	if (window.location.protocol != "https:") {
		return "http";
	} else {
		return "https";
	}
}

// Start invite process
GetGroupData(steam_group_custom_url);
