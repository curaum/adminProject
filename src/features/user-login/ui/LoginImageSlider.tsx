"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import styles from "./LoginImageSlider.module.css";
interface SliderProps {
  images: string[];
}

const SLIDE_INTERVAL = 4000; // 4초

export default function Slider({ images }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // 타이틀/내용 매핑
  const titles: Record<string, string[]> = {
    Onboarding_1p: ["숙련된 인력과 기술,", "믿을 수 있는 서비스"],
    Onboarding_2p: ["최상의 보철물을 위한", "High-end 라인업 장비"],
    Onboarding_3p: ["업무 환경 최적화를 위한", "스마트 솔루션"],
  };

  const contents: Record<string, string[]> = {
    Onboarding_1p: [
      "오랜 보철물 제작 경험을 바탕으로",
      "수준 높은 제품과 서비스를 제공합니다.",
    ],
    Onboarding_2p: [
      "각 파트별 High-end 라인업 장비를 통해",
      "오차없는 최적의 보철물을 제작합니다.",
    ],
    Onboarding_3p: [
      "자체 개발한 MES/ERP 시스템을 통해",
      "의뢰부터 정산, 재고 관리, 배송까지",
      "모든 과정을 전산화하여 제공합니다.",
    ],
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider_wrapper}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className={styles.slider_slide} key={index}>
            <Image
              src={`/images/${image}.svg`}
              alt={image}
              fill={true}
              className={styles.slide_image}
            />

            <div className={styles.text_container}>
              <div className={styles.text_title_container}>
                {titles[image]?.map((title, i) => (
                  <p className={styles.text_title} key={i}>
                    {title}
                  </p>
                ))}
              </div>
              <div className={styles.text_contents_container}>
                {contents[image]?.map((content, i) => (
                  <p className={styles.text_contents} key={i}>
                    {content}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.slider_button_container}>
              <div style={{ marginRight: "32px" }}>
                <Image
                  src={`/images/progressBar_${image}.svg`}
                  alt="progress"
                  width={76}
                  height={14}
                />
              </div>

              <button
                className={`${styles.slider_button} ${styles.prev}`}
                onClick={prevSlide}
              >
                <Image
                  src="/images/white_arrow_left.svg"
                  alt="prev"
                  width={40}
                  height={24}
                />
              </button>
              <button
                className={`${styles.slider_button} ${styles.next}`}
                onClick={nextSlide}
              >
                <Image
                  src="/images/white_arrow_right.svg"
                  alt="next"
                  width={40}
                  height={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
