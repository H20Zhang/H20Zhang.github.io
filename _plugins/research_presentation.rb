# Render the canonical Scholar output once, then organize the existing entries.
# No BibTeX fields, publication status, authorship, or stable paper IDs are changed.
require "nokogiri"
require "cgi"
require "date"
require "time"

module HaoPresentation
  class ResearchBibliography < Liquid::Block
    def render(context)
      areas = context.registers[:site].data.fetch("research_areas")
      fragment = Nokogiri::HTML.fragment(super(context))
      entries = {}
      fragment.css("ol.bibliography").each do |list|
        heading = list.previous_element
        heading = heading.previous_element while heading && heading.name != "h2"
        year = heading&.text&.strip
        unless year&.match?(/\A\d{4}\z/)
          raise "Research bibliography: expected Scholar's year-grouped output"
        end
        list.element_children.each do |node|
          next unless node.name == "li"
          paper = node.at_css(".row > [id]")
          raise "Research bibliography: missing paper ID" unless paper
          key = paper["id"]
          raise "Research bibliography: duplicate paper #{key}" if entries.key?(key)
          node["data-paper-id"] = key
          node["data-year"] = year
          node.css(".links a").each do |link|
            next unless link.text.strip == "Website"
            href = link["href"].to_s
            link.content = "OpenReview" if href.start_with?("https://openreview.net/")
            link.content = "Scholar search" if href.start_with?("https://scholar.google.com/scholar?")
          end
          entries[key] = node
        end
      end
      keys = areas.flat_map { |area| area.fetch("papers") }
      duplicates = keys.tally.select { |_key, count| count > 1 }.keys
      missing = entries.keys - keys
      unknown = keys - entries.keys
      unless duplicates.empty? && missing.empty? && unknown.empty?
        raise "Research bibliography: duplicate=#{duplicates.inspect}; unclassified=#{missing.inspect}; unknown=#{unknown.inspect}. Update _data/research_areas.yml."
      end
      areas.map do |area|
        nodes = area.fetch("papers").map { |key| entries.fetch(key) }
        nodes.each { |node| node["data-area"] = area.fetch("id") }
        lists = nodes.group_by { |node| node["data-year"] }.sort.reverse.map do |year, papers|
          %(<h2 class="bibliography">#{h(year)}</h2><ol class="bibliography">#{papers.map(&:to_html).join}</ol>)
        end.join
        %(<section class="publication-group" data-area="#{h(area.fetch('id'))}" aria-labelledby="#{h(area.fetch('id'))}">) +
          %(<header class="publication-group-header"><h2 class="publication-group-title" id="#{h(area.fetch('id'))}">#{h(area.fetch('title'))}</h2>) +
          %(<p class="publication-group-description">#{h(area.fetch('description'))}</p></header>) +
          %(<div class="publications">#{lists}</div></section>)
      end.join("\n")
    end

    private

    def h(value)
      CGI.escapeHTML(value.to_s)
    end
  end

  # Presentation dates use the site's UTC+8 calendar, not the build host's zone.
  # Date-only values retain their calendar meaning. Machine-readable timestamps
  # elsewhere in the theme remain unchanged.
  module DateFilters
    def hao_date(value, format = "%B %-d, %Y")
      return "" if value.nil? || value.to_s.empty?
      local = case value
              when Time then value.getlocal("+08:00")
              when DateTime then value.new_offset(Rational(8, 24))
              when Date then value
              else Time.parse(value.to_s).getlocal("+08:00")
              end
      local.strftime(format)
    end
  end
end

Liquid::Template.register_tag("research_bibliography", HaoPresentation::ResearchBibliography)
Liquid::Template.register_filter(HaoPresentation::DateFilters)
