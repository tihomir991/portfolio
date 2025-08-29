import type { FC } from "react";
import { memo, useMemo, useState } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Experience } from "../types";
import "./Experience.css";

interface ExperienceItemProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Individual experience item with React 19 transitions
 */
const ExperienceItem: FC<ExperienceItemProps> = memo(({ experience: exp, isExpanded, onToggle }) => {
  const formatDate = useMemo(() => {
    return (dateString: string) => {
      const [year, month] = dateString.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    };
  }, []);

  const handleToggle = () => {
    onToggle();
  };

  const descriptionArray = useMemo(() => {
    return Array.isArray(exp.description) ? exp.description : [exp.description];
  }, [exp.description]);

  return (
    <article className="experience-item" aria-expanded={isExpanded}>
      <div className="experience-timeline">
        <div className="timeline-dot" aria-hidden="true"></div>
        <div className="timeline-line" aria-hidden="true"></div>
      </div>

      <div className="experience-content">
        <div className="experience-header">
          <h3 className="experience-position">{exp.position}</h3>
          <div className="experience-company">{exp.company}</div>
          <div className="experience-duration">
            <time dateTime={exp.startDate}>{formatDate(exp.startDate)}</time>
            {" - "}
            <time dateTime={exp.endDate || new Date().toISOString().split("T")[0]}>{exp.endDate ? formatDate(exp.endDate) : "Present"}</time>
          </div>
        </div>

        <button onClick={handleToggle} className="experience-toggle" aria-expanded={isExpanded} aria-controls={`experience-details-${exp.id}`}>
          {isExpanded ? "Show Less" : "Show More"}
          <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`} aria-hidden="true">
            ▼
          </span>
        </button>

        <div id={`experience-details-${exp.id}`} className={`experience-details ${isExpanded ? "expanded" : "collapsed"}`} aria-hidden={!isExpanded}>
          <ul className="experience-achievements" role="list">
            {descriptionArray.map((achievement, index) => (
              <li key={index} role="listitem">
                {achievement}
              </li>
            ))}
          </ul>

          <div className="experience-technologies">
            <h4>Technologies Used:</h4>
            <div className="tech-tags" role="list" aria-label="Technologies used">
              {exp.technologies.map((tech, index) => (
                <span key={index} className="tech-tag" role="listitem">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

ExperienceItem.displayName = "ExperienceItem";

/**
 * Enhanced Experience component
 */
const ExperienceComponent: FC = memo(() => {
  const { experience } = usePortfolio();
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

  const toggleExpanded = (id: string | number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedItems(new Set(experience.map((exp) => exp.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  const allExpanded = expandedItems.size === experience.length;
  const noneExpanded = expandedItems.size === 0;

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>

          {/* React 19: Enhanced controls with transitions */}
          <div className="experience-controls">
            <button onClick={expandAll} disabled={allExpanded} className="btn btn-outline" aria-label="Expand all experience items">
              Expand All
            </button>
            <button onClick={collapseAll} disabled={noneExpanded} className="btn btn-outline" aria-label="Collapse all experience items">
              Collapse All
            </button>
          </div>
        </div>

        <div className="experience-timeline-container" role="list" aria-label="Work experience timeline">
          {experience.map((exp) => (
            <ExperienceItem key={exp.id} experience={exp} isExpanded={expandedItems.has(exp.id)} onToggle={() => toggleExpanded(exp.id)} />
          ))}
        </div>

        <div className="experience-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ExperienceComponent.displayName = "ExperienceComponent";

export default ExperienceComponent;
