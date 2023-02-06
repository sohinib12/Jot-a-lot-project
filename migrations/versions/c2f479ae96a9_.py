"""empty message

Revision ID: c2f479ae96a9
Revises:
Create Date: 2023-02-06 16:30:54.864742

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'c2f479ae96a9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('notebooks',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=50), nullable=False),
                    sa.Column('is_default', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('scratchpads',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('content', sa.Text(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('notes',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('notebook_id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=50), nullable=False),
                    sa.Column('body', sa.Text(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['notebook_id'], ['notebooks.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('notes')
    op.drop_table('scratchpads')
    op.drop_table('notebooks')
    op.drop_table('users')
    # ### end Alembic commands ###
