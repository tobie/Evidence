EVIDENCE_ROOT_DIR = File.expand_path(File.dirname(__FILE__))
EVIDENCE_DIST_DIR = File.join(EVIDENCE_ROOT_DIR, 'dist')
EVIDENCE_SRC_DIR  = File.join(EVIDENCE_ROOT_DIR, 'src')

$:.unshift File.join(EVIDENCE_ROOT_DIR, 'vendor', 'sprockets', 'lib')

def sprocketize(path, source, destination, strip_comments = true)
  begin
    require 'sprockets'
  rescue LoadError => e
    puts "\nYou'll need Sprockets to build Evidence. Just run:\n\n"
    puts "  $ git submodule init"
    puts "  $ git submodule update"
    puts "\nand you should be all set.\n\n"
  end
  
  secretary = Sprockets::Secretary.new(
    :root           => File.join(EVIDENCE_ROOT_DIR, path),
    :load_path      => [EVIDENCE_SRC_DIR],
    :source_files   => [source],
    :strip_comments => strip_comments
  )
  
  secretary.concatenation.save_to(destination)
end
 
desc 'Builds the distribution.'
task :dist do
  dest = File.join(EVIDENCE_DIST_DIR, 'evidence.js')
  sprocketize('src', 'evidence.js', dest)
end

