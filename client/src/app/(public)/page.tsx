"use client";

import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";

export default function Home() {
  // Dummy data mirroring the design content
  const featuredProducts = [
    {
      _id: "1",
      name: "Lumina Smart WiFi LED Bulb RGB",
      description: "Voice controlled, 16M colors",
      price: 19.99,
      discount: 20,
      rating: 4.5,
      reviewCount: 42,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEhqjaDROppyY2TUY_L7w7dMfsEqft2xsWky41Wt7lqS3yzspvyV-eRR7ysfVD33izLaz8RWfMymEtBS1fqFOCe1qp4BahIkO6UCwueilB8Za6f49TQq7n7RNWhEukNt8PkYZZZiK9UM-KDwc0mNabhoWEsPR9ild8kN14ExdO6iHRXJYZMJg71h5OV9mn5invwOzMUf0rxBxBOr4-hwqPe684T_oFbGxD_vnDPR6rFqXQfd-TiSrNGaYPeqH4alivH7xz60DbULs",
    },
    {
      _id: "2",
      name: "ProSeries 20V Cordless Drill",
      description: "Includes 2 batteries & charger",
      price: 129.0,
      rating: 5,
      reviewCount: 128,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAPk49J0H__oSv1d3kwcxiJ18Q8fgxpCcvVb7-fVZc5osxIAlOn3a2hW606dw6Oq3pGUUCsSdpqDKoJg54s7Hj7DQ7JY9t8vRFmM1XavJOs1PHID0eLmexvPKSSBMp2YaTOUILQEV3U4TY_dRsQZYzQ-rkjpnHAmp257FxodlPBdzXOA1RHztnBxNInJeH5yDFvcRMGKyYIG8VpNDOIClXDLyK4S9RN_LDlMk5T75zVCyEBsKEKXiPmDoohdtbGWfvK3JMgI7e87u8",
    },
    {
      _id: "3",
      name: "Matte Black Rocker Switch",
      description: "Single pole, modern finish",
      price: 8.5,
      rating: 4,
      reviewCount: 8,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVqEoCSCRpEcFCS1Po174Cj3S1BipRQpUvCnJ8N2FhlbDrsQbTht_uowCt1UBHt-bZ-drOIdOBdY8X-AIxOSK48IS9J9o0GSl797hgE0b1yNhCpLbUGyOPRkHHdzrY5paP9zj4YWH-hmBID8amN9JkwWtvcp32mtHrZyrxOrkVTe6y42lqo1M3arPWzxHRT7odD49k9mDeUXcDg6QDPfGrPRpgNbF48gGjY5QYutYRrVvlDibn6IxRnnE-Yy1A2cv8fZy0And5yvo",
    },
    {
      _id: "4",
      name: "12/2 NM-B Wire, 250ft",
      description: "Copper building wire, indoor",
      price: 145.0,
      rating: 5,
      reviewCount: 56,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDM4sPuhBY1KXO4_eJFYBN3Exy9FaAZyzEtL3HkwVeOnzX8biRhzxZ8yqwBj13fwyVMIwUObvouDlm1WwF73mnpr617p5PmSqnZm8Pf2ZoZOGXCO2iBk4iVlnCOlka9iY-he1m621DszTBTRRsbSaoI26S4pYpwaDLRPvLr3z0yKBxJ58QlIlLuKsWP16p8Zarf5qMfIOZI3knmvTeNAsULwe0dZAQ8vypz8Gr56e7TOiSn-iwCfqfNzXfkgbq7IScOFpAXlKubqc",
    },
  ];

  const categories = [
    { name: "Lighting", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2NRObgQzMNCoyO1sxx8e90pmltnkBjJV1qUga4yToomAUirfarj02OQVn6QilMbs-aYhaUFpIju8OwrvL_52W8zB9gh5pzK9PqawhqqLBIju2XiHipppuv4LZXSViZnCS-cxDioiCACHZFMw-B2Akz0E3oixMFEDKMxNwr0C5oC2Pk26BhyZ4Nz4IV3wZ8jfrAThSNPGGlDnQ6Ejxrk8YHXP7cl7ur2rBJEMo-gm6mJx3lMdYdr21OdEhoz1qeAw9NW_huLBbg8o" },
    { name: "Fans", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATl8jfbIc2D08_rRUGnTl60B2lBKLEbH0HxqtFbnJBx9b0bz0rR8LeesHOH3QIqBwm1AKeO8TsxQ_O2X4OeN9bPxOWwi-CTaNThNbh-USmR__MQ_JOLi9TMyyxLIErr05KQWL0Q3HMksJRheZg29i5qtk8c4pdcHbisovV4cCUQR5dY2Hse6rImlkWJV20g-W019X2A7VgoPPjHCR57jOTK2OuKrhTTIakWkQP5Gx2SW4cp9hZmAQXd1uR9_u2qRMBHlsB8GLp5RQ" },
    { name: "Switches", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkz-taY3W0wQF_3FaQYmybdwHwR92HDYgdUZLguo8h-QFNnvzwkamJte5xndb6TELq4xNkQTF26hObWXfXqUmIjljgMZlEChTc8_7d6pBmsd2XVr4CX7yt5_4YFiD9TJTtLdxJeX_W8lH0ziKN6NT2iB-DNQF7CbtJ6hn3Qa_BR4JH4GyrX_Sa_5p03dDC2JMlmL9xRbijrj8eXTeozoaGJn3Cvr2kSaD49ycBCkosWcfUajhF0tu6vDWhW-x7a_eVPr1P47kmLac" },
    { name: "Wiring", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgUNNtFS0oDkj_k_32zPl65hOfSRnCuPu7Y7R9tHOdFD4Mf4BGDox4CSSWY0auIi8cSyFs1Ydl9jmGb2MecMmXMwJ1Lg4Q7RzXYwWlMGA2_5f-pMAWXXjKBFZ6vLRK4cytCJ4FQ2wMqxcR5GHzZaySqv2Wld8vm8SzelwGBe5-gNfigDENqskPw67veRZRXqLloSAoXBJWHKlolYUlQp12mVVPBy-JIhE8-fHIWPxq3OKhEVICxC7rVbe1x8w5rKRE__PTFQXvU-o" },
    { name: "Protection", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSdINFmHKclKXocFuMUZ6_syNjmorufssVR2X09WNh0lQcDP91t8U_32g_hpo9ClyvylGX1vOawILRLXAqkawaWpyjMkg7wBhSZEvhH4HjgifOm863Nzlp90AjEDAEeWELshIEfKu0Qluos8_ATWv2dDaiUK-vqPm694GAqGpA7BaBz2Lk77aUH33Ypgebv0pyhqoevKUvJdZNxlaGLiZgkKbBU7pEtXxV3bR8zj-aNipz52xCGiaH7DGdc95eGWA4_poB0FmHwjA" },
    { name: "Tools", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe86GIwoOS_1kKJ9g-OoYEKQFbnhmA_SgiDYv5qil41ZEYWq6eyYCHj_Jg_ELW5CArk9tKgk3WC6X0Sda0-WcZSIQkjLXsxmXiyFyfNRGVv9PD12xA9xQ7q34uos23Dw7mRN4z0d2UHpB46dknzbQTy_Coq_QUdt82584CeMLzcXYZA5wrjQ--bkFZniVLcON0w48OrUiGJKZk-zReuWdTCuzP9LniO9xAiPxZf5V-DGcNqWKNtmcGn_ptFwZwUM-z-qq8ddxxryA" },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      <div className="w-full max-w-[1440px] px-4 md:px-10 pb-10">

        {/* Hero Section */}
        <div className="py-6">
          <div
            className="relative overflow-hidden rounded-[2rem] min-h-[520px] flex items-center bg-cover bg-center group"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(17, 33, 23, 0.9) 0%, rgba(17, 33, 23, 0.4) 50%, rgba(17, 33, 23, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDADEqPsOmKi_XwT6AvVte0yDQygWKaXYZ2lasqr0jLA8v6hyUh66MVDYjpNFU2O-7zz3D72k5QkRVp3KOi-6o1nxnw_63XoyWOIxgMPa1GdeCpvrrQzN7J5iGAyJProQ_TjdnkXTwzicepoLZ2xTTorXP5pj0ehkLNZeXjB9HXxcVg1WHQdS6TNptMGr6odEC-0zSdIqIksRC6UuEzr0jlBxHubRXGtva1bUJHDOmUihlEXDu6s5dQPFSYlNCgAZK6wZq4Tfchwog")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#112117] via-transparent to-transparent opacity-60"></div>
            <div className="relative z-10 p-8 md:p-16 max-w-3xl flex flex-col gap-6 items-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm border border-primary/20">
                <span className="material-symbols-outlined text-sm">eco</span>
                ENERGY EFFICIENT
              </span>
              <h1 className="text-white text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
                Power Up <br /> <span className="text-primary">Your World.</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
                Discover the latest in smart home switches, professional-grade
                tools, and energy-saving lighting solutions.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/shop">
                  <button className="h-12 px-8 rounded-full bg-primary text-[#122118] text-base font-bold tracking-wide hover:scale-105 transition-transform flex items-center gap-2">
                    Shop Homeowners
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </Link>
                <Link href="/b2b">
                  <button className="h-12 px-8 rounded-full bg-surface-highlight/80 backdrop-blur-md text-white border border-[#3e6b50] text-base font-bold tracking-wide hover:bg-surface-highlight hover:scale-105 transition-all">
                    For Professionals
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Marquee */}
        <div className="w-full py-8 overflow-hidden">
          <p className="text-center text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">
            Trusted by top brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black text-white tracking-tighter">
              PHILIPS
            </div>
            <div className="text-2xl font-bold text-white italic">
              Schneider
            </div>
            <div className="text-xl font-bold text-white border-2 border-white px-2 py-0.5">
              SIEMENS
            </div>
            <div className="text-2xl font-bold text-white tracking-widest">
              LUTRON
            </div>
            <div className="flex items-center gap-1 text-xl font-bold text-white">
              <span className="material-symbols-outlined">bolt</span>ABB
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-10">
          <div className="flex items-end justify-between px-2 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Shop by Category
              </h2>
              <p className="text-gray-400 mt-1">
                Everything you need for your next project
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-1 text-primary text-sm font-bold hover:underline"
            >
              View All{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/shop?category=${cat.name}`} className="group flex flex-col items-center gap-4">
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${cat.image}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <span className="text-white font-medium text-center group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Best Sellers
            </h2>
            <div className="h-px flex-1 bg-[#254632]"></div>
            <div className="flex gap-2">
              <button className="size-10 rounded-full border border-[#254632] flex items-center justify-center text-white hover:bg-[#254632] transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 rounded-full border border-[#254632] flex items-center justify-center text-white hover:bg-[#254632] transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#254632] bg-opacity-40">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-20 gap-10">
              <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 self-center md:self-start bg-yellow-400/20 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold border border-yellow-400/20">
                  <span className="material-symbols-outlined text-sm">
                    engineering
                  </span>
                  B2B EXCLUSIVE
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  Electrician Special:
                  <br />
                  <span className="text-primary">Bulk Savings</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  Register your business today and get{" "}
                  <span className="text-white font-bold">10% off</span> bulk
                  orders over $500. We offer net-30 terms for approved accounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                  <button className="h-14 px-8 rounded-full bg-primary text-[#122118] text-lg font-bold hover:brightness-110 shadow-lg shadow-primary/25 transition-all">
                    Register Business Account
                  </button>
                  <button className="h-14 px-8 rounded-full bg-transparent border-2 border-white/20 text-white text-lg font-bold hover:bg-white/10 transition-all">
                    View B2B Benefits
                  </button>
                </div>
              </div>
              {/* Visual Element */}
              <div className="relative size-64 md:size-80 flex-shrink-0">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <img
                  alt="Electrician hard hat and blueprints"
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-[#254632] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-AG2JpXiB2fT-3UQMvwbIsx9b-DzSLP8aG97UO710bW-wLjvufVzVglC4C3PuMCj9cIdNI-1kP9INrZraiWBOiuME2_9LXdrAwvqA0BdLCwAolHdbg6BwM0QDl6x2cF08AnJQGhu4fgIKUJPVsb-JYi3_YP20SlZrJmXcNQKYbyoOCLoowZlO4MEA0BRFoXxdbWCHjOko3iQJFK5207UCuOuof0n3TfwBpq8y2XofH1_FEEIgg2A7OJy5h48-xWaW-UdTY10xWPI"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#122118] p-4 rounded-2xl border border-[#254632] shadow-xl z-20">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full text-green-500">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Verified Partner</div>
                      <div className="text-white font-bold">Priority Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Arrivals Section */}
        <div className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
            <Link href="/shop" className="text-primary font-bold text-sm hover:underline">See All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Mini Cards */}
            {[
              { name: "Digital Multimeter", price: 45.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3snYJFR1yAkK23XP8wgOQrl9Egqk83o5777kVcGbvqgTdWDiigb1BprXkLyKOHutKoXJggw_wv3dc_3TlXlFjg2lqfwampm-mCNOkx_cR9hbm_4nBA89CtsP8m6xp0NLHnsD5JsbhYZNZxkECgt4i1Z2lHVLVHRyY4EzGTzXPjt0kMBklyZfBnAHCx8cNx8wfrhA2O_3yY6acWr1NAajFGh8EylpSVlJctdRJJgPrnDGTApNWbp3y3q97RvWF4Hc0cYhP5m-0TIk" },
              { name: "Extension Cord 50ft", price: 32.99, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0qBIMIpsBj5e4-SZ-sqM17KTgNDdtDbD6KUHoFFzglU3AwV1UgY9sfCqeEvywd4cgyOaW7dFAGC-wCg6RJUxEJozvbO_tpjPI2XU1aeYimuYJlVKAjqIAHUXPm5qiN0qilf3dYjaAqz1DRZIG_qmodtHSr_vAp3KuCnrIgEm7hrX92-7ecHOLTbmZRHTKSdRIyyaeNmJU7lEkxR7PD4CYmhvhnRpnHmTGGE-bJcCVjSo-EtMjo1m0wy5jVn5JjfgHqjE7L1RjUSw" },
              { name: "Solar Charge Controller", price: 89.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPU52XHgxIjg0bQu0-4QHqq68zqLQskVgwlWI2l3oaPcZBGV8yX7Oy_Q7ix4DmxOU3Bf-myGVZRMGhJOi3HqUuw5i21wUW36N5qsEN4Kwkxv-akHJnq1k71m7l0r2-iO9hsgTvzCqHfmgE3s5KtTpeIqXvpAY4JUEAv64e_B7yNUow3XURyxR4GhPUVkiMJKlOqmNUkeAKvNLmS31EBadA8CSr13GWlBL41AxWfwDPXhnK__TwPkEK-o6du88fYs3nm4cTZur-jw" },
              { name: "Industrial Pendant", price: 55.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_H67mgU8aOXuCYL7vMof5uAo_uAK1YhOc0RYPEunO_q418wBXwBUvcmxrEcHPO65fwK-nWkpr6EZd6VggKAfFj1TZnVSKhvvAEzoKG1Jy_KrOJUrgEGBamD_Pzw5nzJ2d9sVbzDM6-sWZlcoHlDr1F1uasMhGhcY3RgeFtzKi5bWmIjdqLOkR9JqlPT6T5RB0orcYFJex_Xgjp5QGII6-sHBBwqUAHZ51KYicw3mdShPMQr8jPUou7uD6-xaJ07XJA4IkOKU-Pc4" },
              { name: "Smart Thermostat", price: 199.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALhnV-skOGzv9QbO8xmv5eYJ52zl8tcdtrr2TL7XPcEj7zrMnrTP2pz-SOkyzEr7yLp-4jXk8mAzdRfUVCDiQAOLvPzDUrBwhbvlCK0hXXbopuTKSMySeMDXU4fIdLiU6PY1k0qC4F1aC8CEgP_r8yV3tD3kHAg9SIr_Bs6i4dfA2A3k4H9zKRZqYnRzdlxP_Odx0AIBn26OE0390cYrLsonEw9LR-yFIEIB5dGUo69BjZ_ePY0jw1OE4JRqUWUm15mGeN-BE7Iwg" }
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-dark p-4 rounded-2xl hover:bg-surface-highlight transition-colors cursor-pointer group">
                <div className="aspect-square bg-white rounded-xl mb-3 overflow-hidden">
                  <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" src={item.img} />
                </div>
                <p className="text-white font-bold text-sm truncate">{item.name}</p>
                <p className="text-primary font-bold text-sm">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Store Locator Section */}
        <div className="py-12 border-t border-[#254632] mt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center rounded-3xl bg-surface-dark overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Visit Our Showroom</h2>
              <p className="text-gray-400 mb-8">Come see our lighting fixtures in person and speak with our certified electrical consultants.</p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-12 rounded-full bg-[#254632] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Main Headquarters</h4>
                    <p className="text-gray-400">1234 Voltage Ave, Circuit City, CA 90210</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-full bg-[#254632] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Opening Hours</h4>
                    <p className="text-gray-400">Mon - Fri: 8am - 6pm<br />Sat: 9am - 4pm</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 px-6 py-3 rounded-full border border-gray-600 text-white hover:bg-white hover:text-black transition-colors font-bold text-sm">
                Get Directions
              </button>
            </div>
            <div className="h-full min-h-[300px] w-full bg-slate-800 relative">
              <img
                alt="Map of city showing location"
                className="w-full h-full object-cover opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkOKAVEkh3ODely2HGRAp910-FLwvTeC_xIt75RIXIT3-G0N5R6YrN_Dvc2bLU2_tkve7n0m9JnyLohyrQQcEfbVakcDyZbvM2kp5B3MTXdAlRm9XAJfZTZW1Q3_osNuJzte77sm-T_m7E1ql12JZrB2cbYpneMjHLqDTXmBiHkfUc8BbMnOjvcbLVccX-h1UDChsUluK-hjfdFGARp2wcF7_ttV6XGESnkG38_qrxEdhBiymxaTVexw2bBtu2M4nR9VyMjOdTzjY"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary text-[#122118] px-4 py-2 rounded-lg font-bold shadow-xl transform -translate-y-4">
                  ElectroShop HQ
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
