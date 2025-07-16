export const streams = [
	{
		id: 'nyc-twitch',
		name: 'Times Square NYE (Twitch)',
		type: 'twitch',
		channel: 'nyenewyork',
		city: 'New York',
		country: 'US',
		timezone: 'America/New_York',
		description: "Official Times Square New Year's Eve stream on Twitch"
	},
	{
		id: 'sydney-youtube',
		name: 'Sydney Fireworks (YouTube)',
		type: 'youtube',
		videoId: 'dQw4w9WgXcQ',
		city: 'Sydney',
		country: 'AU',
		timezone: 'Australia/Sydney',
		description: 'Sydney fireworks live'
	},
	{
		id: 'tokyo-custom',
		name: 'Tokyo Countdown (Custom)',
		type: 'iframe',
		url: 'https://somecustomstream.com/embed/12345',
		city: 'Tokyo',
		country: 'JP',
		timezone: 'Asia/Tokyo',
		description: 'Special transmission from Tokyo'
	}
];
