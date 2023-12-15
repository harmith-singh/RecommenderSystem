  // Load data from the CSV file
  d3.csv('final_result.csv').then(data => {
    // Extract unique user IDs
    const uniqueUserIds = [...new Set(data.map(d => d.userId))];

    // Create radio buttons for user selection
    d3.select('#userOptions')
      .selectAll('input')
      .data(uniqueUserIds)
      .enter()
      .append('input')
      .attr('type', 'radio')
      .attr('name', 'user')
      .attr('value', d => d)
      .attr('id', d => `user_${d}`)
      .on('change', updateUserSelection);

    d3.select('#userOptions')
      .selectAll('label')
      .data(uniqueUserIds)
      .enter()
      .append('label')
      .attr('for', d => `user_${d}`)
      .text(d => `User ${d}`);

    function updateUserSelection() {
      const selectedUserId = d3.select('input[name="user"]:checked').node().value;
      const userMovies = data.filter(d => d.userId === selectedUserId);

      const zeroRatingMovies = userMovies.filter(d => d.rating === '0');
      const nonZeroRatingMovies = userMovies.filter(d => d.rating !== '0');

      populateMovieOptions('#zeroRatingMovies', zeroRatingMovies, 'movieId');
      populateMovieOptions('#nonZeroRatingMovies', nonZeroRatingMovies, 'movieId');
    }

    function populateMovieOptions(container, movies, property) {
      d3.select(container)
        .selectAll('option')
        .data(movies)
        .enter()
        .append('option')
        .attr('value', d => d[property])
        .text(d => `Movie ${d[property]}`);
    }
  });
