import React from 'react';
import {
  BlueskyIcon,
  BlueskyShareButton,
  FacebookIcon,
  FacebookShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

interface ShareButtonsProps {
  value: string;
}

export default function ShareButtons({ value }: ShareButtonsProps) {
  const shareUrl = 'https://nye.today';
  const title = `2025 is ${value}% done!`;

  return (
    <div className="flex space-x-2 mt-4">
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={32} round={true}></XIcon>
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <RedditShareButton url={shareUrl} title={title}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <PocketShareButton url={shareUrl} title={title}>
        <PocketIcon size={32} round />
      </PocketShareButton>
      <ThreadsShareButton url={shareUrl} title={title}>
        <ThreadsIcon size={32} round />
      </ThreadsShareButton>
      <BlueskyShareButton url={shareUrl} title={title}>
        <BlueskyIcon size={32} round />
      </BlueskyShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
}
