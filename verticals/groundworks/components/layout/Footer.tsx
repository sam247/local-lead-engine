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
        <div className="grid grid-cols-1 gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo_white.svg"
                alt="Mainline Groundworks"
                width={84}
                height={24}
                className="h-5 w-auto sm:h-6"
              />
            </div>
            <p className="mb-6 text-sm text-neutral-300">
              Commercial groundworks contractors providing piling, excavation, site clearance and foundation construction across the UK.
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
                <Link href="/guides" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Groundworks Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Groundworks FAQ
                </Link>
              </li>
              <li>
                <Link href="/companies-cost" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Cost Guides
                </Link>
              </li>
              <li>
                <Link href="/foundation-problems" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Foundation Problems
                </Link>
              </li>
              <li>
                <Link href="/ground-conditions" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Ground Conditions
                </Link>
              </li>
              <li>
                <Link href="/homeowners" className="text-sm text-neutral-300 transition-colors hover:text-white">
                  Homeowner Guides
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
                <span className="text-sm text-neutral-300">{companyInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Location Links Row */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <FooterServiceAreaGroups
            primaryServiceSlug="groundworks-contractors"
            locations={locations}
            variant="onPrimary"
            viewAllAreasHref="/groundworks-contractors-near-me"
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
          />
        </div>
        <div className="container flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-neutral-400 sm:min-w-0 sm:text-left">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:justify-end" aria-label="Footer">
            <Link href="/about" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">About</Link>
            <Link href="/service-areas" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Service Areas</Link>
            <Link href="/projects" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Projects</Link>
            <Link href="/blog" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Blog</Link>
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Terms</Link>
            <Link href="/contractors" className="inline-flex min-h-[44px] items-center px-2 text-sm text-neutral-400 transition-colors hover:text-white">Contractors</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
