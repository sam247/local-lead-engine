import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Clock, Linkedin, Twitter, Facebook } from "lucide-react";
import { companyInfo, services, locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import { FooterServiceAreaGroups, GroupFooter, getServiceUrl } from "engine";
import { mainlineGroupLinksForSite } from "engine/data/mainline-group";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const groupLinks = mainlineGroupLinksForSite(verticalConfig.baseUrl);

  return (
    <footer className="bg-charcoal pb-14 text-neutral-50">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo_white.svg"
                alt="Mainline Drains"
                width={84}
                height={24}
                className="h-5 w-auto sm:h-6"
              />
            </div>
            <p className="mb-6 text-sm text-neutral-300">
              Expert drain repair and drainage solutions across the UK. 24/7 emergency response, CCTV surveys and professional drain relining.
            </p>
            <div className="flex gap-4">
              <a href={companyInfo.social.linkedin} className="text-neutral-400 transition-colors hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.twitter} className="text-neutral-400 transition-colors hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.facebook} className="text-neutral-400 transition-colors hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href={getServiceUrl(service.slug)} className="text-sm text-neutral-300 transition-colors hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Guides & Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/drainage-guides" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Drainage Guides
                </Link>
              </li>
              <li>
                <Link href="/drainage-faq" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Drainage FAQ
                </Link>
              </li>
              <li>
                <Link href="/drain-survey-cost" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/do-i-need-a-drain-survey" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Do I Need a Survey?
                </Link>
              </li>
              <li>
                <Link href="/collapsed-drains-complete-guide" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Complete Guide
                </Link>
              </li>
              <li>
                <Link href="/homebuyer-drainage" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Homebuyer Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm text-neutral-300 transition-colors hover:text-white">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <span className="text-sm text-neutral-300">{companyInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <span className="text-sm text-neutral-300">24/7 Emergency Service Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Location Links Row */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <FooterServiceAreaGroups
            primaryServiceSlug="drain-collapse-repair"
            locations={locations}
            variant="onPrimary"
            viewAllAreasHref="/drain-collapse-near-me"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container border-b border-white/10 py-6">
          <GroupFooter
            items={groupLinks}
            variant="onPrimary"
            trustLine="Our contractors are fully vetted, insured and accredited to UK industry standards"
            dbsLogoSrc="/dbs.png"
            citbLogoSrc="/citb.png"
            trustmarkLogoSrc="/trustmark.png"
            fmbLogoSrc="/fmb.png"
          />
        </div>
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-neutral-400">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2 gap-y-2">
            <Link href="/about" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">About</Link>
            <Link href="/service-areas" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Service Areas</Link>
            <Link href="/projects" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Projects</Link>
            <Link href="/blog" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Blog</Link>
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Terms</Link>
            <Link href="/contractors" className="inline-flex min-h-[44px] items-center text-sm text-neutral-400 transition-colors hover:text-white">Contractors</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
