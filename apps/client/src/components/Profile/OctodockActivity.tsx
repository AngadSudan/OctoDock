import React, { useState } from "react";

const MONTHS_30 = ["apr", "jun", "sep", "nov"];

const getDaysInMonth = (month) => {
  const monthStr = month.toString().toLowerCase().substring(0, 3);
  if (MONTHS_30.indexOf(monthStr) !== -1) {
    return 30;
  } else if (monthStr === "feb") {
    const year = new Date().getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  } else {
    return 31;
  }
};

const generateArr = () => {
  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate.getMonth());
  const rows = Math.ceil(daysInMonth / 6);
  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(new Array(6).fill(0));
  }
  return arr;
};

const getDateForCell = (rowIndex, colIndex) => {
  const dayNumber = rowIndex * 6 + colIndex + 1;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth);

  if (dayNumber > daysInMonth) {
    return null;
  }

  const date = new Date(currentYear, currentMonth, dayNumber);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

function OctodockActivity() {
  const arr = generateArr();
  const [activity, setActivity] = useState(arr);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e, rowIndex, colIndex, value) => {
    const dayNumber = rowIndex * 6 + colIndex + 1;
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(currentDate.getMonth());

    if (dayNumber > daysInMonth) {
      return;
    }

    const rect = e.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });
    setHoveredCell({ rowIndex, colIndex, value });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="min-h-fit bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-md relative">
        <div className="flex flex-col gap-2">
          {activity.map((activityRow, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className="relative flex w-full gap-2 justify-center"
              >
                {activityRow.map((act, colIndex) => {
                  const dayNumber = rowIndex * 6 + colIndex + 1;
                  const currentDate = new Date();
                  const daysInMonth = getDaysInMonth(currentDate.getMonth());
                  const isValidDay = dayNumber <= daysInMonth;

                  return (
                    <div
                      key={colIndex}
                      className={`relative w-10 h-10 rounded border transition-all duration-200 ${
                        isValidDay
                          ? "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800 cursor-pointer"
                          : "border-gray-900 bg-gray-950 opacity-30 cursor-default"
                      }`}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e, rowIndex, colIndex, act)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {isValidDay &&
                        hoveredCell?.rowIndex === rowIndex &&
                        hoveredCell?.colIndex === colIndex && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none z-50 whitespace-nowrap">
                            <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700 text-sm">
                              <div className="font-semibold">
                                {hoveredCell.value}{" "}
                                {hoveredCell.value === 1
                                  ? "contribution"
                                  : "contributions"}
                              </div>
                              <div className="text-gray-400 text-xs mt-1">
                                {getDateForCell(
                                  hoveredCell.rowIndex,
                                  hoveredCell.colIndex
                                )}
                              </div>
                            </div>
                            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 border-r border-b border-gray-700"></div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OctodockActivity;
