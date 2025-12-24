describe('Localhost tasks', () => {
  it('Task1. Get all posts. Verify HTTP response status code and content type.', () => {
    cy.request({
      method: 'GET',
      url: '/posts',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('Task2. Get only first 10 posts. Verify HTTP response status code. Verify that only first posts are returned.', () => {
    cy.request({
      method: 'GET',
      url: '/posts',
      qs: {
        _limit: 10,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.eq(10);
    });
  });

  it('Task3. Get posts with id = 55 and id = 60. Verify HTTP response status code. Verify id values of returned records.', () => {
    cy.request({
      method: 'GET',
      url: '/posts?id=55&id=60',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(2);

      const returnedIds = response.body.map((post) => post.id);
      expect(returnedIds).to.have.members([55, 60]);
    });
  });

  it('Task4. Create a post. Verify HTTP response status code.', () => {
    cy.request({
      method: 'POST',
      url: '/664/posts',
      failOnStatusCode: false,
      body: {
        title: 'Hi, I am a Cypress tester!',
        body: 'Something something something',
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('Task6. Create post entity and verify that the entity is created. Verify HTTP response status code. Use JSON in body.', () => {
    const uniq = Date.now();

  const POST_Task6 = {
    title: `title-${uniq}`,
    body: `body-${uniq}`,
    userId: 1,
  };

    cy.request({
      method: 'POST',
      url: '/posts',
      failOnStatusCode: false,
      body: POST_Task6,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.include(POST_Task6);
    });
  });

  it('Task7. Update non-existing entity. Verify HTTP response status code.', () => {
    const nonExistingId = Date.now();

    const PUT_Task7 = {
      title: `updated-title-${nonExistingId}`,
      body: `updated-body-${nonExistingId}`,
      userId: 1,
    };

    cy.request({
      method: 'PUT',
      url: `/posts/${nonExistingId}`,
      failOnStatusCode: false,
      body: PUT_Task7,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Task8. Create post entity and update the created entity. Verify HTTP response status code and verify that the entity is updated.', () => {
    const uniq = Date.now();

    const POST_Task8 = {
      title: `title-${uniq}`,
      body: `body-${uniq}`,
      userId: 1,
    };

    const PUT_Task8 = {
      title: `updated-title-${uniq}`,
      body: `updated-body-${uniq}`,
      userId: 1,
    };

    cy.request({
      method: 'POST',
      url: '/posts',
      failOnStatusCode: false,
      body: POST_Task8,
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body).to.have.property('id');

      const createdId = createResponse.body.id;

      cy.request({
        method: 'PUT',
        url: `/posts/${createdId}`,
        failOnStatusCode: false,
        body: PUT_Task8,
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);

        expect(updateResponse.body).to.have.property('id', createdId);
        expect(updateResponse.body).to.include(PUT_Task8);
      });
    });
  });

  it('Task9. Delete non-existing post entity. Verify HTTP response status code.', () => {
    const nonExistingId = Date.now();

    cy.request({
      method: 'DELETE',
      url: `/posts/${nonExistingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Task10. Create post entity, update the created entity, and delete the entity. Verify HTTP response status code and verify that the entity is deleted.', () => {
    const uniq = Date.now();

    const POST_Task10 = {
      title: `title-${uniq}`,
      body: `body-${uniq}`,
      userId: 1,
    };

    const PUT_Task10 = {
      title: `updated-title-${uniq}`,
      body: `updated-body-${uniq}`,
      userId: 1,
    };

    cy.request({
      method: 'POST',
      url: '/posts',
      failOnStatusCode: false,
      body: POST_Task10,
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body).to.have.property('id');

      const createdId = createResponse.body.id;

    cy.request({
      method: 'PUT',
      url: `/posts/${createdId}`,
      failOnStatusCode: false,
      body: PUT_Task10,
    }).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
      expect(updateResponse.body).to.include(PUT_Task10);

    cy.request({
      method: 'DELETE',
      url: `/posts/${createdId}`,
      failOnStatusCode: false,
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);

    cy.request({
      method: 'GET',
      url: `/posts/${createdId}`,
      failOnStatusCode: false,
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(404);
          });
        });
      });
    });
  });
});
