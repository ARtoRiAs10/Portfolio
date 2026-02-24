import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Strings from "@/constants/strings"; // Check this path!
import type { ISocialLinkItem } from "@/types";

const socialLinks: ISocialLinkItem[] = [
  {
    name: Strings.github || "GitHub",
    url: Strings.githubLink || "#", 
    icon: faGithub,
    text: Strings.githubUsername || "",
  },
  {
    name: Strings.linkedIn || "LinkedIn",
    url: Strings.linkedInLink || "#",
    icon: faLinkedin,
    text: Strings.linkedInUsername || "",
  },
  {
    name: Strings.instagram || "Instagram",
    url: Strings.instagramLink || "#",
    icon: faInstagram,
    text: Strings.instagramUsername || "",
  },
  {
    name: Strings.email || "Email",
    url: Strings.primaryEmailLink || "#",
    icon: faEnvelope,
    text: Strings.primaryEmail || "",
  },
  {
    name: Strings.buyMeACoffee || "Buy Me A Coffee",
    url: Strings.buyMeACoffeeLink || "#",
    icon: "/images/buy-me-a-coffee.png",
    text: Strings.buyMeACoffeeUsername || "",
  },
  {
    name: Strings.koFi || "Ko-Fi",
    url: Strings.koFiLink || "#",
    icon: "/images/ko-fi.png",
    text: Strings.koFiUsername || "",
  },
];

export default socialLinks;