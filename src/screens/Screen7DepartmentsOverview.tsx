import type { FC } from 'react';
import { DepartmentId, ScreenId } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { DepartmentHeraldicCard } from '../components/DepartmentHeraldicCard';
import { GoldenHatButton } from '../components/GoldenHatButton';

interface Screen7DepartmentsOverviewProps {
  onSelectDepartment: (deptId: DepartmentId) => void;
  onTakeTest: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen7DepartmentsOverview: FC<Screen7DepartmentsOverviewProps> = ({
  onSelectDepartment,
  onTakeTest,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
          ✦ THE SDG SORTING HAT ✦
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-fantasy text-amber-100 tracking-tight">
          Our Four Departments
        </h2>
        <div className="w-24 h-0.5 bg-amber-500/40 mx-auto" />
        <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
          Four different paths, one passionate community. Discover the departments, their
          missions and what you can do in each one.
        </p>
      </div>

      {/* 4 Department Cards Grid (Matching Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {Object.values(DEPARTMENTS).map((dept) => (
          <DepartmentHeraldicCard
            key={dept.id}
            department={dept}
            onLearnMore={() => onSelectDepartment(dept.id as DepartmentId)}
          />
        ))}
      </div>

      {/* Bottom Take Test CTA Banner (Matching Image 3) */}
      <div className="text-center pt-6 space-y-2">
        <GoldenHatButton
          text="Take the Sorting Hat Test"
          onClick={onTakeTest}
        />
        <div className="text-xs text-amber-300/60">
          Discover which department matches your personality and interests.
        </div>
      </div>
    </div>
  );
};

