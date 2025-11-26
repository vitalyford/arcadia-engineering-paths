'use client';

import React, { useState, useEffect } from 'react';
import { preEngineeringRequirements, RequirementCategory, Course, CourseOption } from '@/data/engineering-paths';
import { getArcadiaCourseUrl, extractCourseCode, getArcadiaAucUrls } from '@/lib/semester-utils';

const PreEngineeringRequirements: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrollingToSection, setIsScrollingToSection] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    technical: true,
    nonTechnical: true,
    major: true,
    auc: true
  });

  useEffect(() => {
    // Find the scrollable parent container
    const scrollContainer = document.querySelector('.overflow-auto');

    const handleScroll = () => {
      const scrollY = scrollContainer?.scrollTop || window.scrollY;
      setShowBackToTop(scrollY > 300);

      // Don't update active section if we're in the middle of scrolling to a section
      if (isScrollingToSection) return;

      // Update active section based on scroll position
      const sections = ['overview', 'technical', 'nonTechnical', 'major', 'auc', 'notes'];
      let foundSection = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is near the top (within sticky nav area)
          if (rect.top >= -50 && rect.top <= 150 && !foundSection) {
            setActiveSection(section);
            foundSection = true;
            break;
          }
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollingToSection]);

  const scrollToSection = (sectionId: string) => {
    // Immediately set active section and disable scroll detection
    setActiveSection(sectionId);
    setIsScrollingToSection(true);

    const element = document.getElementById(sectionId);
    const scrollContainer = document.querySelector('.overflow-auto');

    if (element && scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = 70; // Offset for sticky header - adjusted to match detection threshold
      const scrollPosition = scrollContainer.scrollTop + (elementTop - containerTop) - offset;

      scrollContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll detection after animation completes
      setTimeout(() => setIsScrollingToSection(false), 1000);
    } else if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll detection after animation completes
      setTimeout(() => setIsScrollingToSection(false), 1000);
    }
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleCourseClick = (courseCode: string) => {
    const cleanCode = extractCourseCode(courseCode);
    if (cleanCode) {
      const url = getArcadiaCourseUrl(cleanCode);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAucClick = (aucCode: string) => {
    const urls = getArcadiaAucUrls(aucCode);
    // Open all URLs (most will be one, GE/GR will open two tabs)
    urls.forEach(url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  };

  const renderCourse = (course: Course, index: number) => {
    const cleanCode = extractCourseCode(course.code);
    const isClickable = !!cleanCode;

    return (
      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1">
          {isClickable ? (
            <button
              onClick={() => handleCourseClick(course.code)}
              className="font-medium text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer"
            >
              {course.code}
            </button>
          ) : (
            <span className="font-medium text-primary">{course.code}</span>
          )}
          <span className="ml-2 text-gray-700">{course.name}</span>
          {course.note && (
            <div className="text-sm text-amber-600 mt-1">{course.note}</div>
          )}
        </div>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
          {course.credits} credits
        </span>
      </div>
    );
  };

  const renderCourseOption = (option: CourseOption, index: number) => (
    <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-amber-400 shadow-sm">
      <div className="text-sm text-amber-600 mb-2 font-medium">
        Choose {option.selectCount} course{option.selectCount > 1 ? 's' : ''} from:
      </div>
      <div className="space-y-2">
        {option.courses.map((course, courseIndex) => {
          const cleanCode = extractCourseCode(course.code);
          const isClickable = !!cleanCode;

          return (
            <div key={courseIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
              <div>
                {isClickable ? (
                  <button
                    onClick={() => handleCourseClick(course.code)}
                    className="font-medium text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer"
                  >
                    {course.code}
                  </button>
                ) : (
                  <span className="font-medium text-primary">{course.code}</span>
                )}
                <span className="ml-2 text-gray-700">{course.name}</span>
              </div>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-600">
                {course.credits} credits
              </span>
            </div>
          );
        })}
      </div>
      {option.note && (
        <div className="text-sm text-gray-500 mt-2 italic">{option.note}</div>
      )}
    </div>
  );

  const renderCategory = (category: RequirementCategory) => (
    <div key={category.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>
        {category.totalCredits && (
          <div className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
            {category.totalCredits} credits total
          </div>
        )}
      </div>

      <div className="space-y-3">
        {category.courses && category.courses.map(renderCourse)}
        {category.courseOptions && category.courseOptions.map(renderCourseOption)}
      </div>

      {category.note && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-amber-800 text-sm">{category.note}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => scrollToSection('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'overview'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('technical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'technical'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Technical
          </button>
          <button
            onClick={() => scrollToSection('nonTechnical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'nonTechnical'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Non-Technical
          </button>
          <button
            onClick={() => scrollToSection('major')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'major'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Major
          </button>
          <button
            onClick={() => scrollToSection('auc')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'auc'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            AUC
          </button>
          <button
            onClick={() => scrollToSection('notes')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'notes'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Notes
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 bg-primary hover:bg-primary-hover text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <div id="overview" className="mb-8 scroll-mt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Requirements
        </h1>
        <p className="text-gray-600 text-lg">
          Required courses for all students in Arcadia&apos;s dual-degree engineering programs
        </p>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-primary to-primary-hover p-4 rounded-lg text-center shadow-sm">
          <div className="text-2xl font-bold text-white">{preEngineeringRequirements.totalTechnicalCredits}</div>
          <div className="text-red-100">Technical Credits</div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg text-center shadow-sm">
          <div className="text-2xl font-bold text-white">{preEngineeringRequirements.nonTechnicalCredits}</div>
          <div className="text-green-100">Non-Technical Credits</div>
        </div>
        {preEngineeringRequirements.aucRequirements && (
          <div className="bg-gradient-to-r from-primary to-primary-hover p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-white">
              {preEngineeringRequirements.aucRequirements.acceleratedPrograms.length}
            </div>
            <div className="text-red-100">AUCs (3+2/3+3)</div>
          </div>
        )}
      </div>

      {/* Technical Requirements */}
      <div id="technical" className="mb-8 scroll-mt-24">
        <div
          className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
          onClick={() => toggleCategory('technical')}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Technical Requirements</h2>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategories.technical ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedCategories.technical && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-primary rounded-lg p-3">
              <div className="flex items-start">
                <span className="text-primary text-xl mr-2">💡</span>
                <div className="text-primary text-sm leading-relaxed">
                  <strong>Tip:</strong> Click on any course code to view course details and check availability.
                </div>
              </div>
            </div>
            {preEngineeringRequirements.categories.map(renderCategory)}
          </div>
        )}
      </div>

      {/* Non-Technical Requirements */}
      <div id="nonTechnical" className="mb-8 scroll-mt-24">
        <div
          className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
          onClick={() => toggleCategory('nonTechnical')}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Non-Technical Requirements</h2>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategories.nonTechnical ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedCategories.nonTechnical && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 font-medium mb-2">
                28 non-technical credit hours (Humanities and Social Sciences)
              </div>
              <div className="text-gray-700 text-sm">
                {preEngineeringRequirements.transferRequirements}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Major Requirements */}
      <div id="major" className="mb-8 scroll-mt-24">
        <div
          className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
          onClick={() => toggleCategory('major')}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Major Requirements</h2>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategories.major ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedCategories.major && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-gray-700 text-sm leading-relaxed">
                {preEngineeringRequirements.majorRequirements}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AUC Requirements for 3+2 and 3+3 Programs */}
      {preEngineeringRequirements.aucRequirements && (
        <div id="auc" className="mb-8 scroll-mt-24">
          <div
            className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            onClick={() => toggleCategory('auc')}
          >
            <h2 className="text-2xl font-semibold text-gray-900">AUC Requirements (3+2/3+3)</h2>
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategories.auc ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {expandedCategories.auc && (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="bg-red-50 border border-primary rounded-lg p-4">
                <div className="mb-4">
                  <h4 className="text-primary font-semibold mb-3 text-lg">
                    For 3+2 and 3+3 Programs
                  </h4>
                  <p className="text-gray-700 text-sm mb-4">
                    {preEngineeringRequirements.aucRequirements.acceleratedNote}
                  </p>
                  <div className="bg-white border border-primary rounded-lg p-3 mb-4">
                    <div className="flex items-start">
                      <span className="text-primary text-xl mr-2">💡</span>
                      <div className="text-primary text-sm leading-relaxed">
                        <strong>Tip:</strong> Many courses satisfy multiple AUC requirements. Click on an AUC code below to see available courses for that requirement.
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {preEngineeringRequirements.aucRequirements.acceleratedPrograms.map((req, index) => (
                      <button
                        key={index}
                        onClick={() => handleAucClick(req.code)}
                        className="bg-gradient-to-br from-primary to-primary-hover p-3 rounded-lg text-center hover:from-primary-light hover:to-primary transition-all duration-200 shadow-md cursor-pointer transform hover:scale-105"
                      >
                        <div className="text-red-100 font-semibold text-sm">{req.code} (x{req.count})</div>
                        <div className="text-red-200 text-xs mt-1 leading-tight">{req.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-red-200">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start">
                      <span className="text-amber-500 text-xl mr-2">ℹ️</span>
                      <div className="text-amber-800 text-sm leading-relaxed">
                        <strong>Important:</strong> {preEngineeringRequirements.aucRequirements.fourYearNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Important Notes */}
      <div id="notes" className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 scroll-mt-24 shadow-sm">
        <h3 className="text-amber-800 font-medium mb-2">Important Notes</h3>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• Students must maintain required GPA standards for their chosen engineering program</li>
          <li>• Some partner schools have specific course requirements beyond these basics</li>
          <li>• Consult with your academic advisor to plan your specific pathway</li>
          <li>• Chemistry sequence note: CH 101/102 required by PITT, highly recommended for other programs</li>
        </ul>
      </div>
    </div>
  );
};

export default PreEngineeringRequirements;