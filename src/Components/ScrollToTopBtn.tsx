import { useEffect, useState } from "react";

interface IProps {
  bgColor: string;
  color: string;
}
function ScrollToTopBtn({ bgColor, color }: IProps) {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 20) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {showScrollTopBtn ? (
        <figure className="to-top-btn" onClick={scrollToTop} style={{ backgroundColor: bgColor }}>
          <i className="ph ph-arrow-up" style={{ color: color }}></i>
        </figure>
      ) : null}
    </>
  );
}

export default ScrollToTopBtn;
