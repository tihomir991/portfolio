import type { FC } from "react";
import { memo } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Project } from "../types";
import "./Projects.css";

interface ProjectCardProps {
  project: Project;
}

/**
 * Individual project card component
 */
const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="project-card" data-featured={project.featured}>
      <div className="project-card__image">
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-project.jpg";
          }}
        />
        <div className="project-card__overlay">
          <div className="project-card__links">
            {project.links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.url)}
                className={`project-link project-link--${link.type}`}
                aria-label={`Open ${link.label} for ${project.title}`}
              >
                {link.type === "github" && <span className="icon-github">⚡</span>}
                {link.type === "live" && <span className="icon-external">🔗</span>}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.title}</h3>
          <div className="project-card__status">
            <span className={`status-badge status-badge--${project.status}`}>{project.status}</span>
            {project.featured && <span className="featured-badge">FEATURED</span>}
          </div>
        </div>

        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__tags">
          {project.tags?.map((tag, index) => (
            <span key={index} className="project-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

/**
 * Projects section component displaying all portfolio projects
 */
const Projects: FC = () => {
  const { projects } = usePortfolio();

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">Mission Portfolio</h2>
          <p className="section-subtitle">Showcasing my development missions and achievements</p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="projects-section">
            <h3 className="projects-section__title">Featured Missions</h3>
            <div className="projects-grid projects-grid--featured">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="projects-section">
            <h3 className="projects-section__title">Other Projects</h3>
            <div className="projects-grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="projects-empty">
            <p>No projects found. Check back soon for updates!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
