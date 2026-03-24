import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Linkedin, Twitter, Facebook } from "lucide-react";
import { companyInfo, services, locations } from "@/lib/data";
import { TrackablePhoneLink } from "engine";
import { CALL_TRACK_VERTICAL } from "@/lib/callTrackVertical";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const topLocations = locations.slice(0, 8);

  return (
    <footer className="bg-primary pb-14 text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-foreground">
                <span className="font-display text-lg font-bold text-primary">MD</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold">Mainline Drains</span>
              </div>
            </div>
            <p className="mb-6 text-sm text-primary-foreground/80">
              Expert drain repair and drainage solutions across London. 24/7 emergency response, CCTV surveys and professional drain relining.
            </p>
            <div className="flex gap-4">
              <a href={companyInfo.social.linkedin} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.twitter} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.facebook} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground" aria-label="Facebook">
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
                  <Link href={`/services/${service.slug}`} className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground">
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
                <Link href="/drainage-guides" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Drainage Guides
                </Link>
              </li>
              <li>
                <Link href="/drainage-faq" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Drainage FAQ
                </Link>
              </li>
              <li>
                <Link href="/drain-survey-cost" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/do-i-need-a-drain-survey" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Do I Need a Survey?
                </Link>
              </li>
              <li>
                <Link href="/collapsed-drains-complete-guide" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Complete Guide
                </Link>
              </li>
              <li>
                <Link href="/homebuyer-drainage" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
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
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={CALL_TRACK_VERTICAL}
                  serviceSlug={null}
                  locationSlug={null}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  {companyInfo.phone}
                </TrackablePhoneLink>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">{companyInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">{companyInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Location Links Row */}
        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <h4 className="mb-3 text-sm font-semibold text-primary-foreground/60">Areas We Cover</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {topLocations.map((loc) => (
              <Link key={loc.id} href={`/drain-collapse-repair/${loc.id}`} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                {loc.name}
              </Link>
            ))}
            <Link href="/drain-collapse-near-me" className="text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground">
              All Areas →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">About</Link>
            <Link href="/projects" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Projects</Link>
            <Link href="/blog" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Blog</Link>
            <Link href="/privacy" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Privacy</Link>
            <Link href="/terms" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Terms</Link>
            <Link href="/contractors" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Contractors</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
