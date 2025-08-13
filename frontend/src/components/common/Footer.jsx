import React from "react";
import Input from "../inputs/Inputs";
import { Brand } from "./Brand";

export default function Footer() {
  return (
    <footer className="bg-secondary text-light">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Brand />
            </div>
            
            <p className="text-sm">
              We provide high-quality products and services to customers
              worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase">Subscribe</h3>
            <form className="flex flex-col space-y-2">
              <p className="text-sm">
                Subscribe to our newsletter and get updates on new products and
                discounts.
              </p> 
              <Input
                // label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
              />
              <button
                type="submit"
                className="btn btn-tertiary uppercase"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2025 DeviceHub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
