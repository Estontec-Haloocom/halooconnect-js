"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface BlogShareButtonProps {
  title: string;
}

const BlogShareButton = ({ title }: BlogShareButtonProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
  );
};

export default BlogShareButton;
