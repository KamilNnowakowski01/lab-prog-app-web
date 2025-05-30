import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow-lg border-1 rounded-4">
            <Card.Body className="p-5">
              <h2 className="mb-3">👋 Welcome to <strong>ManagMe</strong></h2>
              <p className="text-muted mb-4">
                Easily manage your projects with a clean and simple interface.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/project">
                  <Button variant="primary" size="lg">
                    📁 Browse Projects
                  </Button>
                </Link>
                <Link to="/project/add">
                  <Button variant="success" size="lg">
                    ➕ Add New Project
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
