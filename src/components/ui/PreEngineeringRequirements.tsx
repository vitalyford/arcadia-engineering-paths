'use client';

import React from 'react';
import { preEngineeringRequirements, RequirementCategory, Course, CourseOption } from '@/data/engineering-paths';

const PreEngineeringRequirements: React.FC = () => {
  const renderCourse = (course: Course, index: number) => (
    <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
      <div className="flex-1">
        <span className="font-medium text-cyan-300">{course.code}</span>
        <span className="ml-2 text-gray-300">{course.name}</span>
        {course.note && (
          <div className="text-sm text-yellow-300 mt-1">{course.note}</div>
        )}
      </div>
      <span className="text-sm bg-gray-600 px-2 py-1 rounded text-gray-300">
        {course.credits} credits
      </span>
    </div>
  );

  const renderCourseOption = (option: CourseOption, index: number) => (
    <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-yellow-400">
      <div className="text-sm text-yellow-300 mb-2">
        Choose {option.selectCount} course{option.selectCount > 1 ? 's' : ''} from:
      </div>
      <div className="space-y-2">
        {option.courses.map((course, courseIndex) => (
          <div key={courseIndex} className="flex justify-between items-center p-2 bg-gray-600 rounded">
            <div>
              <span className="font-medium text-cyan-300">{course.code}</span>
              <span className="ml-2 text-gray-300">{course.name}</span>
            </div>
            <span className="text-sm bg-gray-500 px-2 py-1 rounded text-gray-300">
              {course.credits} credits
            </span>
          </div>
        ))}
      </div>
      {option.note && (
        <div className="text-sm text-gray-400 mt-2 italic">{option.note}</div>
      )}
    </div>
  );

  const renderCategory = (category: RequirementCategory) => (
    <div key={category.id} className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
          <p className="text-gray-400 mt-1">{category.description}</p>
        </div>
        {category.totalCredits && (
          <div className="bg-cyan-600 px-3 py-1 rounded-full text-white text-sm font-medium">
            {category.totalCredits} credits total
          </div>
        )}
      </div>

      <div className="space-y-3">
        {category.courses && category.courses.map(renderCourse)}
        {category.courseOptions && category.courseOptions.map(renderCourseOption)}
      </div>

      {category.note && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
          <div className="text-yellow-300 text-sm">{category.note}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Pre-Engineering Requirements
        </h1>
        <p className="text-gray-400 text-lg">
          Required courses for all students in Arcadia&apos;s dual-degree engineering programs
        </p>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{preEngineeringRequirements.totalTechnicalCredits}</div>
          <div className="text-blue-100">Technical Credits</div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{preEngineeringRequirements.nonTechnicalCredits}</div>
          <div className="text-green-100">Non-Technical Credits</div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">
            {preEngineeringRequirements.totalTechnicalCredits + preEngineeringRequirements.nonTechnicalCredits}
          </div>
          <div className="text-purple-100">Total Credits</div>
        </div>
      </div>

      {/* Technical Requirements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Technical Requirements</h2>
        <div className="space-y-6">
          {preEngineeringRequirements.categories.map(renderCategory)}
        </div>
      </div>

      {/* Non-Technical Requirements */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Non-Technical Requirements</h3>
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
            <div className="text-green-100 font-medium mb-2">
              28 non-technical credit hours (Humanities and Social Sciences)
            </div>
            <div className="text-gray-300 text-sm">
              {preEngineeringRequirements.transferRequirements}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Major Requirements</h3>
          <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4">
            <div className="text-gray-300 text-sm leading-relaxed">
              {preEngineeringRequirements.majorRequirements}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
        <h3 className="text-yellow-300 font-medium mb-2">📌 Important Notes</h3>
        <ul className="text-gray-300 text-sm space-y-1">
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